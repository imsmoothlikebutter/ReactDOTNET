using System;
using Microsoft.EntityFrameworkCore;
using cleanbrightcompany.Models;


namespace cleanbrightcompany.Data
{
	public class AppDBContext : DbContext
	{
		public DbSet<Manufacturer> Manufacturers { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			Manufacturer[] manufacturersToSeed = new Manufacturer[4];

			for(int i = 1; i<=4; i++)
			{
				manufacturersToSeed[i - 1] = new Manufacturer
				{
					ManufacturerID = i,
					ManufacturerName = $"Manufacturer {i}",
					ManufacturerEmail = $"Manufacturer{i}@gmail.com"
				};
			}
			modelBuilder.Entity<Manufacturer>().HasData(manufacturersToSeed);
		}
	}
}

