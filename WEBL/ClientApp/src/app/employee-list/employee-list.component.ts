import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { Company } from '../../../../Models/company.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  message;

  employeeList: Employee[];
  popupVisible = false;
  currentEmployee: Employee;
  companyList: Company[];

  addEmployeeForm: FormGroup;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.getAllEmployees();

    //Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
    });

    //Set up the form to add new Employee
    this.addEmployeeForm = new FormGroup({
      'name': new FormControl(),
      'surname': new FormControl(),
      'email': new FormControl(),
      'homeAddress': new FormControl(),
      'salary': new FormControl(),
      'companyId': new FormControl(),
    });

    //subscribe to the emitDelete event emitter
    this.dataService.emitDelete.subscribe(data => {
      this.message = data;
      console.log(this.message);
      this.getAllEmployees();
    });

  }

  getAllEmployees() {
    //Show All Employees
    this.dataService.getAllEmployees().subscribe(data => {
      this.employeeList = data;
    });
  }

  //when the add new employee button is clicked
  addNewEmployee() {
    this.popupVisible = true;
    console.log(this.companyList);
  }

  //when the user submits a new employee to be added
  submitEmployee() {

    //create the new employee that needs to be added
    this.currentEmployee = {
      employeeId: 0,
      name: this.addEmployeeForm.value.name,
      surname: this.addEmployeeForm.value.surname,
      email: this.addEmployeeForm.value.email,
      address: this.addEmployeeForm.value.homeAddress,
      salary: this.addEmployeeForm.value.salary,
      companyId: +this.addEmployeeForm.value.companyId
    };

    this.dataService.addEmployee(this.currentEmployee).subscribe(data => {
      this.message = data;
      console.log('Below is the actual message');
      console.log(this.message);
      this.getAllEmployees();
    });

    this.addEmployeeForm.reset();
    this.popupVisible = false;

  }

}


