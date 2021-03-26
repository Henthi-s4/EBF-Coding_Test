using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Company
    {
        //All properties for an individual company

        [Key]
        public int CompanyId { get; set; }

        public string Name { get; set; }
    }
}
