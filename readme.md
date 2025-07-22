# MyTodoList

A simple **Todo List** full-stack application with:

[Watch example.mov](docs/example-1.mp4)



https://github.com/user-attachments/assets/f0b338c7-8655-4731-8b42-56ce87a219b8


## Stack

- **Backend**: ASP.NET Core 9 (Minimal API) + SQLite + EF Core
- **Frontend**: React + Vite + Tailwind CSS
- **Dockerized**: Run both apps individually or together with Docker Compose

---

## Running Locally

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/)
- SQLite (optional — created automatically)

---

### Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

Api runs on http://localhost:8080

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

App runs on http://localhost:5173

Make sure backend is running or adjust the API URL in frontend/.env.

### Run with Docker Compose

Build and start everything with one command:

```bash
docker-compose up --build
```

Frontend: http://localhost:5173

Backend: http://localhost:8080

Note: SQLite DB (todos.db) is persisted via volume. CORS is configured for cross-origin access.

### Environment Variables

The backend supports these optional environment variables:

```bash
Variable Description Example
CORS_ALLOWED_ORIGINS=http://localhost:5173 # Comma-separated list of allowed origins
ASPNETCORE_ENVIRONMENT=Development # Sets environment type
```

The frontend uses a `.env` file for configuration:

```bash
VITE_API_URL=http://localhost:8080 # API URL for backend
```

### Room for improvements
- Improve security and performance to the api
  - this was actually my first time building an API in .net so the current implementation follows the basic patterns and good practices I've found while studying it
- Connect the FE and BE with a better tool than fetch
  - for example react query for more inteligent caching and optmistic updates
- Update docker files to handle prod enviroments too
  - At the moment it only runs in dev mode
- Use a more robust database
