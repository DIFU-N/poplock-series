using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using MongoDB.Bson;
using server.Data;
using server.Models;
using server.Repositories;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add controllers
builder.Services.AddControllers();

// Registers the required services
builder.Services.AddOpenApi();

// Add CORS
// string? frontendUrl =
//     Environment.GetEnvironmentVariable("FRONTEND_URL")
//     ?? throw new Exception("FRONTEND_URL not set");

// string? thoughtUrl =
//     Environment.GetEnvironmentVariable("THOUGHT_URL")
//     ?? throw new Exception("FRONTEND_URL not set");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            // .WithOrigins([frontendUrl, thoughtUrl])
            .WithOrigins([
                // "https://localhost:5270",
                // "https://localhost:7064",
                "http://localhost:3000",
                "http://localhost:3001",
                // "${FRONTEND_URL}"
            ]) // URL where your Blazor app runs
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// JWT config
// Secret (env only)
string jwtKey =
    Environment.GetEnvironmentVariable("JWT_KEY") ?? throw new Exception("JWT_KEY not set");

// Non-secrets (config)
string jwtIssuer =
    builder.Configuration["Jwt:Issuer"]
    ?? throw new Exception("Jwt:Issuer missing in appsettings.json");

string jwtAudience =
    builder.Configuration["Jwt:Audience"]
    ?? throw new Exception("Jwt:Audience missing in appsettings.json");

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),

            RoleClaimType = ClaimTypes.Role,
        };

        // Configure JWT auth to read from cookies
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["auth_token"];
                return Task.CompletedTask;
            },
        };
    });

builder.Services.AddAuthorization();

// Add Controllers
builder.Services.AddControllers();

// Services
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<RatingService>();
builder.Services.AddHttpClient<TvMazeService>(); //addscoped or addclient

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    options.AddSecurityDefinition(
        "bearer",
        new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "JWT Authorization header using the Bearer scheme.",
        }
    );

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("bearer", document)] = [],
    });
});

// Add MongoDb services
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddSingleton<InviteTokenService>();
builder.Services.AddScoped<UserRepository>();

builder.Services.AddScoped<MustHavsRepository>();
builder.Services.AddScoped<ShowRankingRepository>();
builder.Services.AddScoped<GenreRepository>();
builder.Services.AddScoped<ShowRepository>();
builder.Services.AddScoped<InviteRepository>();
builder.Services.AddScoped<EpisodeRepository>();
builder.Services.AddScoped<RatingRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MongoDbContext>();

    try
    {
        // Warm up the MongoDB connection
        await context.Users.Database.RunCommandAsync<BsonDocument>(new BsonDocument("ping", 1));

        // Warm up the words collection
        await context.Users.EstimatedDocumentCountAsync();

        // Console.WriteLine("MongoDB warmed up.");
    }
    catch (Exception ex)
    {
        Console.Error.WriteLine($"MongoDB warm-up failed: {ex.Message}");
    }
}

// Enable CORS
app.UseCors();

// Enable Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

if (Environment.GetEnvironmentVariable("ENABLE_SWAGGER") == "true")
{
    app.UseSwagger(options =>
    {
        options.OpenApiVersion = OpenApiSpecVersion.OpenApi3_1;
    });
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

// map Controllers
app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.Run();
