using Microsoft.EntityFrameworkCore;
using MyTodoList.Data;
using MyTodoList.Dtos;
using MyTodoList.Models;

namespace MyTodoList.Endpoints;

public static class TodoEndpoints
{
    public static void MapTodoEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/todos", async (TodoDbContext db) => Results.Ok(await db.Todos.ToListAsync()));

        app.MapGet(
            "/todos/{id:guid}",
            async (Guid id, TodoDbContext db) =>
            {
                var todo = await db.Todos.FindAsync(id);
                return todo is not null ? Results.Ok(todo) : Results.NotFound();
            }
        );

        app.MapPost(
            "/todos",
            async (TodoItemDto input, TodoDbContext db) =>
            {
                var todo = new TodoItem
                {
                    Id = Guid.NewGuid(),
                    Title = input.Title,
                    IsCompleted = false,
                };
                db.Todos.Add(todo);
                await db.SaveChangesAsync();
                return Results.Created($"/todos/{todo.Id}", todo);
            }
        );

        app.MapPut(
            "/todos/{id:guid}",
            async (Guid id, TodoItemDto input, TodoDbContext db) =>
            {
                var todo = await db.Todos.FindAsync(id);
                if (todo is null)
                    return Results.NotFound();

                todo.Title = input.Title;
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
        );

        app.MapDelete(
            "/todos/{id:guid}",
            async (Guid id, TodoDbContext db) =>
            {
                var todo = await db.Todos.FindAsync(id);
                if (todo is null)
                    return Results.NotFound();

                db.Todos.Remove(todo);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
        );
    }
}
