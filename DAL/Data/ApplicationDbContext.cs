using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        //ensure each table can be reached and has a descriptive name e.g. Employee for the employee table

        public DbSet<Employee> Employee { get; set; }

        public DbSet<Company> Company { get; set; }

   
    }
}
