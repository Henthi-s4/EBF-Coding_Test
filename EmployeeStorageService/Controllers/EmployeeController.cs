using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeStorageService.Data;
using EmployeeStorageService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeStorageService.Controllers
{
    [Route("api")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private readonly ApplicationDbContext _db;

        public EmployeeController(ApplicationDbContext applicationDbContext)
        {
            _db = applicationDbContext;
        }

        ///////////////////////////////////////////
        /*
            View a single Employee
            /api/GetEmployee/1 
                    return the employee with an id of 1
        */
        [HttpGet("GetEmployee/{id}")]
        public object GetEmployee(int id)
        {
            Employee emp = _db.Employee.Find(id);

            if (emp != null)
            {
                return emp;
            }
            else
            {
                return BadRequest("Employee with ID: " + id + " was not found");
            }
        }

        ///////////////////////////////////////////
        /*
            View all employees    
            /api/GetAllEmployees
                    return all of the employees in the database
        */
        [HttpGet("GetAllEmployees")]
        public object GetAllEmployees()
        {
            List<Employee> empList = _db.Employee.Select(e => new Employee
            {
                EmployeeId = e.EmployeeId,
                Name = e.Name,
                Surname = e.Surname,
                Email = e.Email,
                Address = e.Address,
                Salary = e.Salary,
                CompanyId = e.CompanyId
            }).ToList();


            if (empList.Count() > 0)
            {
                return empList;
            }
            else
            {
                return BadRequest("There were no employees found");
            }

        }

        ///////////////////////////////////////////
        /*
            Post a single Employee    
            /api/addEmployee
                    add a new employee to the database
        */
        [HttpPost("AddEmployee")]
        public object AddEmployee([FromBody] Employee employee)
        {
            try
            {
                _db.Employee.Add(employee);
                _db.SaveChanges();
                return employee;
            }
            catch //(Exception e)
            {
                //The error occured, return the full error to the frontend

                return BadRequest("Employee could not be added");
            }

        }

        ///////////////////////////////////////////
        /*
            Update a single Employee    
            /api/updateEmployee/1
                    update an employee in the database, using his EmployeeId
        */
        [HttpPut("UpdateEmployee/{id}")]
        public object UpdateFullEmployee([FromBody] Employee employee, int id)
        {
            employee.EmployeeId = id;

            _db.Employee.Update(employee);
            _db.SaveChanges();

            return (employee);
        }

        ///////////////////////////////////////////
        /*
            Delete a single Employee    
            /api/deleteEmployee/1
                    delete an employee in the database, using his EmployeeId
        */
        [HttpDelete("DeleteEmployee/{id}")]
        public object DeleteEmployee(int id)
        {
            Employee emp = _db.Employee.Find(id);

            if (emp != null)
            {
                _db.Employee.Remove(emp);
                _db.SaveChanges();
                return emp;
            }
            else
            {
                return BadRequest("Employee with ID: " + id + " was not found and could therefore not be deleted");
            }

        }

        ///////////////////////////////////////////
        /*
            Find the average salary for an employee per company
            /api/GetCompanyAverageSalary/1
                    find all employees of a certain company and calculate the average salary
        */
        [HttpGet("GetCompanyAverageSalary/{id}")]
        public object GetCompanyAverageSalary(int id)
        {

            Company company = _db.Company.Find(id);

            if (company != null)
            {
                List<Employee> empList = _db.Employee.Where(i => i.CompanyId == id).Select(e => new Employee
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
                    return BadRequest("The company with id " + id + " does not have any employees");
                }

            }
            else
            {
                return BadRequest("There is no company that was found with the company id of " + id);
            }

        }

        ///////////////////////////////////////////
        /*
            View all companies    
            /api/GetAll
                    return all of the employees in the database
        */
        [HttpGet("GetAllCompanies")]
        public object GetAllCompanies()
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
