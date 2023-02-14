using System;
using Microsoft.EntityFrameworkCore;
using cleanbrightcompany.Models;
using cleanbrightcompany.Data;

namespace cleanbrightcompany.Controllers
{
	public class ManufacturersController
	{
		internal async static Task<List<Manufacturer>> GetManufacturersAsync()
		{
			using(var db = new AppDBContext())
			{
				return await db.Manufacturers.ToListAsync();
			}
		}

        internal async static Task<Manufacturer> GetManufacturerByIdAsync(int manufacturerId)
		{
			using (var db = new AppDBContext())
			{
				return await db.Manufacturers.FirstOrDefaultAsync(manufacturer => manufacturer.ManufacturerID == manufacturerId);
			}
		}

        internal async static Task<bool> addManufacturerAsync(Manufacturer manufacturerToAdd)
		{
			using(var db = new AppDBContext())
			{
				try
				{
					await db.Manufacturers.AddAsync(manufacturerToAdd);
					return await db.SaveChangesAsync() >= 1;
				}
				catch (Exception e)
				{
					return false;
				}
			}
		}

        internal async static Task<bool> UpdateManufacturerAsync(Manufacturer manufacturerToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Manufacturers.Update(manufacturerToUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteManufacturerAsync(int manufacturerId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Manufacturer manufacturerToDelete = await GetManufacturerByIdAsync(manufacturerId);
                    db.Remove(manufacturerToDelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}

