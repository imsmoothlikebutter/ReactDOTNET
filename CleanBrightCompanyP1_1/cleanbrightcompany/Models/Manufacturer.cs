using System;
using System.ComponentModel.DataAnnotations;
namespace cleanbrightcompany.Models
{
	public class Manufacturer
	{
		[Key]
		public int ManufacturerID { get; set; }

		[Required]
		[MaxLength(225)]
		public string ManufacturerName { get; set; } = string.Empty;

		[Required]
		[MaxLength(225)]
		public string ManufacturerEmail { get; set; } = string.Empty;

    }
}
