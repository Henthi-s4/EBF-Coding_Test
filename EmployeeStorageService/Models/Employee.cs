using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeStorageService.Models
{
    public class Employee
    {
        //All properties for an individual employee

        [Key]
        public int EmployeeId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public double Salary { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        [ForeignKey(nameof(Company))]
        public int CompanyId { get; set; }

    }
}
