using System;
using System.Collections.Generic;
using AutoMapper;
using InvestingOak.Data;
using InvestingOak.Data.Entities;
using InvestingOak.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace InvestingOak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProjectsController : Controller
    {
        private readonly IRepository repository;
        private readonly IMapper mapper;
        private readonly ILogger<ProjectsController> logger;

        public ProjectsController(IRepository repository, IMapper mapper, ILogger<ProjectsController> logger)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                IEnumerable<Project> result = repository.GetProjects();
                return Ok(mapper.Map<IEnumerable<Project>, IEnumerable<ProjectDescModel>>(result));
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to get project list: {e}");
                return BadRequest("Failed to get project list.");
            }
        }

        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            try
            {
                Project result = repository.GetProjectByName(name);
                return Ok(result);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to get project: {e}");
                return BadRequest("Failed to get project.");
            }
        }

        [HttpPost("[action]")]
        public IActionResult Create([FromBody] ProjectDescModel descModel)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                Project newProject = mapper.Map<ProjectDescModel, Project>(descModel);
                newProject.CreationDate = DateTime.Now;
                newProject.InitialBalance = newProject.Balance;

                repository.AddEntity(newProject);

                if (!repository.SaveAll()) return BadRequest(ModelState);

                ProjectDescModel postDescModel = mapper.Map<Project, ProjectDescModel>(newProject);
                return Created($"/api/projects/{postDescModel.Name}", postDescModel);
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to create project: {e}");
                return BadRequest("Failed to create project.");
            }
        }

        [HttpDelete("{name}")]
        public IActionResult Delete(string name)
        {
            try
            {
                Project project = repository.GetProjectByName(name);

                if (project == null || repository.RemoveEntity(project).State != EntityState.Deleted)
                {
                    throw new Exception("Project because it does not exist.");
                }

                if (!repository.SaveAll()) return BadRequest("Failed to delete project.");

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to delete project: {e}");
                return BadRequest("Failed to delete project.");
            }
        }

        [HttpPut("{name}")]
        public IActionResult Put(string name, [FromBody] Project project)
        {
            try
            {
                repository.UpdateProject(name, project);

                if (!repository.SaveAll())
                {
                    throw new Exception("Could not update project");
                }

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to update project: {e}");
                return BadRequest("Failed to update project.");
            }
        }

        [HttpPut("rename")]
        public IActionResult Rename(string oldName, string newName)
        {
            try
            {
                Project project = repository.GetProjectByName(oldName);
                project.Name = newName;
                repository.UpdateProject(oldName, project);

                if (!repository.SaveAll())
                {
                    throw new Exception("Could not update project.");
                }

                return Ok();
            }
            catch (Exception e)
            {
                logger.LogError($"Failed to rename project: {e}");
                return BadRequest("Failed to rename project.");
            }
        }
    }
}
