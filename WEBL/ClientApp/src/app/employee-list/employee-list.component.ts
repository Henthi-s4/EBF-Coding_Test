import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    //Show All Employees
    this.dataService.getAllEmployees().subscribe(data => {
      this.employeeList = data;
      //console.log('List of all Employees');
      //console.log(this.employeeList);
    });

  }

}
