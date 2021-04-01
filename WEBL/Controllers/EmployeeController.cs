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
            /api/getEmployee
                    return the employee with an id of 1
        */
        [HttpGet("getEmployee")]
        public object getEmployee(int employeeId)
        {
            Employee emp = _db.Employee.Find(employeeId);

            if (emp != null)
            {
                return emp;
            }
            else
            {
                return BadRequest("Employee with ID: " + employeeId + " was not found");
            }
        }

        ///////////////////////////////////////////
        /*
            View all employees    
            /api/GetAllEmployees
                    return all of the employees in the database
        */
        [HttpGet("getAllEmployees")]
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
            View all employees of a specific company    
            /api/getAllEmployeesForCompany
                    return all of the employees in the database lnked to a specific company
        */
        [HttpGet("getAllEmployeesForCompany")]
        public object getAllEmployeesForCompany(int companyId)
        {
            List<Employee> empList = _db.Employee.Where(i => i.CompanyId == companyId).Select(e => new Employee
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
        public object addEmployee(Employee employee)
        {
            try
            {
                _db.Employee.Add(employee);
                _db.SaveChanges();
                return Ok(employee);
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
            /api/updateEmployee
                    update an employee in the database, using his EmployeeId
        */
        [HttpPut("updateEmployee")]
        public object updateEmployee([FromBody] Employee employee)
        {
            _db.Employee.Update(employee);
            _db.SaveChanges();

            return Ok(employee);
        }

        ///////////////////////////////////////////
        /*
            Delete a single Employee    
            /api/deleteEmployee/1
                    delete an employee in the database, using his EmployeeId
        */
        [HttpDelete("deleteEmployee")]
        public object deleteEmployee(int employeeId)
        {
            Employee emp = _db.Employee.Find(employeeId);

            if (emp != null)
            {
                _db.Employee.Remove(emp);
                _db.SaveChanges();
                return emp;
            }
            else
            {
                return BadRequest("Employee with ID: " + employeeId + " was not found and could therefore not be deleted");
            }

        }

    }
}
