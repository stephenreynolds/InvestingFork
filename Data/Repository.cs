using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using InvestingOak.Data.Entities;

namespace InvestingOak.Data
{
    public class Repository : IRepository
    {
        private readonly ApplicationDbContext context;
        private readonly ILogger logger;
        private readonly IMapper mapper;

        public Repository(ApplicationDbContext context, ILogger<Repository> logger, IMapper mapper)
        {
            this.context = context;
            this.logger = logger;
            this.mapper = mapper;
        }

        public bool SaveAll()
        {
            return context.SaveChanges() > 0;
        }

        public EntityEntry AddEntity(object model)
        {
            return context.Add(model);
        }

        public EntityEntry RemoveEntity(object model)
        {
            return context.Remove(model);
        }

        public void UpdateProject(string name, Project model)
        {
            Project project = context.Project.FirstOrDefault(p => p.Name == name);
            if (project != null)
            {
                project = model;
                context.Project.Update(project);
                context.SaveChanges();
            }
            else
            {
                throw new InvalidOperationException("Project does not exist.");
            }
        }

        public Project GetProjectByName(string name)
        {
            return context.Project.FirstOrDefault(p => p.Name == name);
        }

        public IEnumerable<Project> GetProjects()
        {
            return context.Project;
        }
    }
}
