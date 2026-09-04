# ---------- BUILD STAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build
WORKDIR /server

# Copy the project file
COPY *.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy all the remaining files
COPY . ./

# Publish to /app/out
RUN dotnet publish -c Release -o /app/out

# ---------- RUNTIME STAGE ----------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app

# Copy published output from build stage
COPY --from=build /app/out ./

# Run the backend DLL (make sure this matches your .csproj name)
ENTRYPOINT ["dotnet", "server.dll"]
