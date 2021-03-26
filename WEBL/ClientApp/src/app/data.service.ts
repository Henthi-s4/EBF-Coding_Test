import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Company } from '../../../Models/company.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl: string;
  employeeList;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  ///////////////////////////////////////////
  /*
      View all employees
      /api/getAllEmployees
              return the employee with an id of 1
  */
  getAllEmployees() {

    return this.http.get<any>(this.baseUrl + 'api/getAllEmployees').pipe(map(data => {
      if (data) {
      }
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      View a single employee
      /api/getEmployee
              return all of the employees in the database
  */
  getEmployee(employeeId: number) {

    return this.http.get<any>(this.baseUrl + 'api/getEmployee' + '?employeeId=' + employeeId).pipe(map(data => {
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      Post a single Employee
      /api/addEmployee
              add a new employee to the database
  */
  addEmployee(employee) {

    return this.http.post<any>(this.baseUrl + 'api/addEmployee', employee).pipe(map(data => {
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      Update a single Employee
      /api/updateEmployee
              update an employee in the database, using his EmployeeId
  */
  updateEmployee(employee) {

    return this.http.put<any>(this.baseUrl + 'api/updateEmployee', employee).pipe(map(data => {
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      Update a single Employee
      /api/updateEmployee
              update an employee in the database, using his EmployeeId
  */
  deleteEmployee(employeeId) {

    return this.http.delete<any>(this.baseUrl + 'api/deleteEmployee' + '?employeeId=' + employeeId).pipe(map(data => {
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      View all employees
      /api/getAllEmployees
              return the employee with an id of 1
  */
  getAllCompanies() {

    return this.http.get<any>(this.baseUrl + 'api/getAllCompanies').pipe(map(data => {
      if (data) {
      }
      return data;
    }));

  }

  ///////////////////////////////////////////
  /*
      Find the average salary for an employee per company
      /api/getCompanyAverageSalary
              find all employees of a certain company and calculate the average salary
  */
  getCompanyAverageSalary(companyId: number) {
    return this.http.get<any>(this.baseUrl + 'api/getCompanyAverageSalary' + '?companyId=' + companyId).pipe(map(data => {
      return data;
    }));
  }
}
