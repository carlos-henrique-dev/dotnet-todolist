using Microsoft.EntityFrameworkCore;
using MyTodoList.Models;

namespace MyTodoList.Data;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options)
        : base(options) { }

    public DbSet<TodoItem> Todos => Set<TodoItem>();
}
