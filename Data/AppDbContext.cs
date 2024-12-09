using Microsoft.EntityFrameworkCore;
using UrlShortenerAPI.Models;

namespace UrlShortenerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UrlModel> Urls { get; set; }
    }
}
