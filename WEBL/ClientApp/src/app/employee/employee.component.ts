import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../../Models/company.model';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: Employee;
  companyList: Company[];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    //Show All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      //console.log('List of all Companies');
      //console.log(this.companyList);
    });

  }

}
