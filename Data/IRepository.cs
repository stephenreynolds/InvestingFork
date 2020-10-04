using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using InvestingOak.Data.Entities;

namespace InvestingOak.Data
{
    public interface IRepository
    {
        bool SaveAll();
        EntityEntry AddEntity(object model);
        EntityEntry RemoveEntity(object model);

        void UpdateProject(string name, Project model);
        Project GetProjectByName(string name);
        IEnumerable<Project> GetProjects();
    }
}
