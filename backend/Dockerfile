FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app

COPY . ./

# Restore dependencies
RUN dotnet restore

# Default: run in watch mode
CMD ["dotnet", "watch", "--project", "MyTodoList.csproj", "run", "--urls", "http://0.0.0.0:8080"]
