import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../../../Models/company.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() company: Company;
  salary: number;
  /*companyList: Company[];*/

  //////////////////////////////////////////////
  /*
    Constructor
      Used to set the dataService
   */
  constructor(private dataService: DataService) {

  }

  //////////////////////////////////////////////
  /*
    Code to be executed as soon as the component is initialised
      Find average salary and subscribe to the event emitter
   */
  ngOnInit() {

    this.getAverageSalary();
    //subscribe to the emitChange event emitter
    this.dataService.emitChange.subscribe(data => {
      const message = data;
      console.log(message);
      this.getAverageSalary();
    });

  }

  //////////////////////////////////////////////
  /*
    Function to call the API call to fetch the average salary for a company
      Used to get the current company's average salary
   */
  getAverageSalary() {
    this.dataService.getCompanyAverageSalary(this.company.companyId).subscribe(data => {
      this.salary = data;
    });
  }

  //displayEmployees() {
  //  this.dataService.getAllEmployeesForCompany(this.company.companyId).subscribe(data => {
  //    this.companyList = data;
  //    console.log('The list of employees for company ' + this.company.name);
  //    console.log(this.companyList);
  //  });
  //}

}
