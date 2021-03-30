import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../Models/employee.model';
import { Company } from '../../../Models/company.model';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  employeeList;
  employee;
  message;
  companyList;
  salary;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    //Show All Employees
    //this.dataService.getAllEmployees().subscribe(data => {
    //  this.employeeList = data;
    //  console.log('List of all Employees');
    //  console.log(this.employeeList);
    //});

    //Show Specific Employee (based on EmployeeId)
    //this.dataService.getEmployee(3).subscribe(data => {
    //  this.employee = data;
    //  console.log('Employee 3 is: ');
    //  console.log(this.employee);
    //});

    //Add A New Employee
    //this.dataService.addEmployee(this.newEmployee).subscribe(data => {
    //  this.message = data;
    //  console.log(this.message);
    //});

    //Update Existing Employee
    //this.dataService.updateEmployee(this.newEmployee).subscribe(data => {
    //  this.message = data;
    //  console.log(this.message);
    //});

    //Delete Existing Employee
    //this.dataService.deleteEmployee(this.newEmployee.employeeId).subscribe(data => {
    //  this.message = data;
    //  console.log(this.message);
    //});

    //Show All Companies
    //this.dataService.getAllCompanies().subscribe(data => {
    //  this.companyList = data;
    //  console.log('List of all Companies');
    //  console.log(this.companyList);
    //});

    //Show Average Salary For A Specific Company
    //this.dataService.getCompanyAverageSalary(this.newCompany.companyId).subscribe(data => {
    //  this.salary = data;
    //  console.log('The average salary is: ');
    //  console.log(this.salary);
    //});

    //Find all employees of a specific company
    //this.dataService.getAllEmployeesForCompany(this.newCompany.companyId).subscribe(data => {
    //  this.companyList = data;
    //  console.log('The list of employees for company ' + this.newCompany.name);
    //  console.log(this.companyList);
    //});

  }

}
