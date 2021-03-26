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
  companyList: Company[];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    //Show Average Salary For A Specific Company
    this.dataService.getCompanyAverageSalary(this.company.companyId).subscribe(data => {
      this.salary = data;
      //console.log('The average salary is: ');
      //console.log(this.salary);
    });

  }

  displayEmployees() {
    //Find all employees of a specific company
    this.dataService.getAllEmployeesForCompany(this.company.companyId).subscribe(data => {
      this.companyList = data;
      console.log('The list of employees for company ' + this.company.name);
      console.log(this.companyList);
    });
  }

}
