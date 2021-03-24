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
            /api/getEmployee/1 
                    return the employee with an id of 1
        */
        [HttpGet("getEmployee/{id}")]
        public object getEmployee(int id)
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
            /api/getAll
                    return all of the employees in the database
        */
        [HttpGet("getAll")]
        public object getAllEmployees()
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
        [HttpPost("addEmployee")]
        public object addEmployee([FromBody] Employee employee)
        {
            try
            {
                _db.Employee.Add(employee);
                _db.SaveChanges();
                return employee;
            }
            catch (Exception e)
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
        [HttpPut("updateEmployee/{id}")]
        public object updateFullEmployee([FromBody] Employee employee, int id)
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
        [HttpDelete("deleteEmployee/{id}")]
        public object deleteEmployee(int id)
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

        [HttpGet("getCompanyAverageSalary/{id}")]
        public object getCompanyAverageSalary(int id)
        {
            var emps = _db.Employee.FromSqlRaw("SELECT * FROM dbo.Employee").ToList();
            return emps;
        }

    }
}
