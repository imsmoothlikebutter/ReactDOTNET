using cleanbrightcompany.Data;
using cleanbrightcompany.Models;
using cleanbrightcompany.Controllers;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CORSPolicy",
                builder =>
                {
                    builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithOrigins("http://localhost:3000");
                });
        });

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(SwaggerGenOptions =>
        {
            SwaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "CleanBrightCompany", Version = "v1" });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI(swaggerUIOptions =>
        {
            swaggerUIOptions.DocumentTitle = "Clean Bright Company";
            swaggerUIOptions.SwaggerEndpoint("swagger/v1/swagger.json", "Web API serving a very simple Manufacturer Model.");
            swaggerUIOptions.RoutePrefix = string.Empty;
        });


        app.UseHttpsRedirection();

        app.UseCors("CORSPolicy");

        app.MapGet("/get-all-manufacturers", async () => await ManufacturersController.GetManufacturersAsync()).WithTags("Manufacturer EndPoints");

        app.MapGet("/get-manufacturer-by-id/{manufacturerId}", async (int manufacturerId) =>
        {
            Manufacturer manufacturerToReturn = await ManufacturersController.GetManufacturerByIdAsync(manufacturerId);
            if (manufacturerToReturn != null)
            {
                return Results.Ok(manufacturerToReturn);
            }
            else
            {
                return Results.BadRequest();
            }
        }).WithTags("Manufacturer EndPoints");

        app.MapPost("/add-manufacturer", async (Manufacturer manufacturerToAdd) =>
        {
            bool addSuccessful = await ManufacturersController.addManufacturerAsync(manufacturerToAdd);
            if (addSuccessful)
            {
                return Results.Ok("Add successful");
            }
            else
            {
                return Results.BadRequest();
            }
        }).WithTags("Manufacturer EndPoints");

        app.MapPut("/update-manufacturer", async (Manufacturer manufacturerToUpdate) =>
        {
            bool updateSuccessful = await ManufacturersController.UpdateManufacturerAsync(manufacturerToUpdate);
            if (updateSuccessful)
            {
                return Results.Ok("Update successful");
            }
            else
            {
                return Results.BadRequest();
            }
        }).WithTags("Manufacturer EndPoints");

        app.MapDelete("/delete-manufacturer/{manufacturerId}", async (int manufacturerId) =>
        {
            bool deleteSuccessful = await ManufacturersController.DeleteManufacturerAsync(manufacturerId);
            if (deleteSuccessful)
            {
                return Results.Ok("Delete successful");
            }
            else
            {
                return Results.BadRequest();
            }
        }).WithTags("Manufacturer EndPoints");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}