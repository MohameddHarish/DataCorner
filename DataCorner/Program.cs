using DataCorner.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMyServices();

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

var configuration = builder.Configuration;  
var connectionString = configuration.GetConnectionString("ttdconnection");

builder.Services.AddControllers();
app.UseDeveloperExceptionPage();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Enable CORS
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Serve Angular static files
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

// This middleware will serve your Angular app for all other requests
app.MapFallbackToFile("index.html");

app.Run();
