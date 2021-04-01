using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WEBL.Controllers
{
    [Route("api")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CompanyController(ApplicationDbContext applicationDbContext)
        {
            _db = applicationDbContext;
        }

        ///////////////////////////////////////////
        /*
            Find the average salary for an employee per company
            /api/getCompanyAverageSalary
                    find all employees of a certain company and calculate the average salary
        */
        [HttpGet("getCompanyAverageSalary")]
        public object getCompanyAverageSalary(int companyId)
        {

            Company company = _db.Company.Find(companyId);

            if (company != null)
            {
                List<Employee> empList = _db.Employee.Where(i => i.CompanyId == company.CompanyId).Select(e => new Employee
                {
                    EmployeeId = e.EmployeeId,
                    Name = e.Name,
                    Surname = e.Surname,
                    Email = e.Email,
                    Address = e.Address,
                    Salary = e.Salary,
                    CompanyId = e.CompanyId
                }).ToList();

                if (empList.Count > 0)
                {
                    var avg = empList.Average(x => x.Salary);
                    return avg;
                }
                else
                {
                    return BadRequest("The company with id " + company.CompanyId + " does not have any employees");
                }

            }
            else
            {
                return BadRequest("There is no company that was found with the company id of " + company.CompanyId);
            }

        }

        ///////////////////////////////////////////
        /*
            View all companies    
            /api/GetAll
                    return all of the employees in the database
        */
        [HttpGet("getAllCompanies")]
        public object getAllCompanies()
        {
            List<Company> compList = _db.Company.Select(c => new Company
            {
                CompanyId = c.CompanyId,
                Name = c.Name
            }).ToList();


            if (compList.Count() > 0)
            {
                return compList;
            }
            else
            {
                return BadRequest("There were no companies found");
            }

        }
    }
    
}
