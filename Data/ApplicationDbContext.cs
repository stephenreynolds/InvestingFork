using InvestingOak.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using InvestingOak.Data.Entities;

namespace InvestingOak.Data
{
    public sealed class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            Database.EnsureCreated();
        }

        public DbSet<Project> Project { get; set; }

        public DbSet<OptionTrade> OptionTrade { get; set; }

        public DbSet<StockTrade> StockTrade { get; set; }
    }
}
