using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();

        //Cross Origin Resource Sharing
        builder.Services.AddCors();

        //Register DbContext

        builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        // middleware
        app.UseCors(opt =>
        {
            opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
        });

        app.UseAuthorization();

        app.MapControllers();

        var scope= app.Services.CreateScope();
        var context= scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        try
        {
            await context.Database.MigrateAsync();
            DbInitailizer.Initialize(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "A problem occurred during migration");
        }
        app.Run();
    }
}