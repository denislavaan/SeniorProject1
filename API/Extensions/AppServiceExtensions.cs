
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace API.Extensions
{
    public static class AppServiceExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration config)
        {
        services.AddScoped<ITokenService, TokenService>();
            services.AddDbContext<DataContext>(Options =>
            {
                Options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
} 