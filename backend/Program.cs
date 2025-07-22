using Microsoft.EntityFrameworkCore;
using MyTodoList.Data;
using MyTodoList.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder
    .Configuration["CORS_ALLOWED_ORIGINS"]
    ?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        policy =>
        {
            if (allowedOrigins is { Length: > 0 })
            {
                policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
            }
            else
            {
                policy.DisallowCredentials();
            }
        }
    );
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TodoDbContext>(options => options.UseSqlite("Data Source=todos.db"));

var app = builder.Build();

// Use CORS (important: must go before endpoints)
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoDbContext>();
    db.Database.Migrate();
}

app.MapTodoEndpoints();

app.Run();
