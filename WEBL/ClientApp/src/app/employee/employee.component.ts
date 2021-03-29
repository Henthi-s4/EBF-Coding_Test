import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../../../../Models/company.model';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';
import {
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxFormModule
} from 'devextreme-angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: Employee;
  companyList: Company[];
  companyNameList: string[] = [];
  updateEmployeeForm: FormGroup;
  popupVisible = false;
  message;

  labelLocation: string;
  readOnly: boolean;
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  width: any;

  constructor(private dataService: DataService) {
    this.labelLocation = 'top';
    this.minColWidth = 500;
    this.colCount = 2;
  }

  ngOnInit() {

  }

  //button clicked to open popup
  updateNewEmployee() {
    this.popupVisible = true;
    console.log(this.employee);

    //Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      console.log(this.companyList)

      //populate to display
      this.companyList.forEach((element) => {
        this.companyNameList.push(element.name);
      });

      console.log(this.companyNameList);
    });

  }

  //when the user submits the updated employee
  submitEmployee() {

    //change values to the updated values
    this.employee.name = this.updateEmployeeForm.value.name;
    this.employee.surname = this.updateEmployeeForm.value.surname;
    this.employee.email = this.updateEmployeeForm.value.email;
    this.employee.address = this.updateEmployeeForm.value.homeAddress;
    this.employee.salary = this.updateEmployeeForm.value.salary;
    this.employee.companyId = +this.updateEmployeeForm.value.companyId;

    this.dataService.updateEmployee(this.employee).subscribe(data => {
      this.message = data;
      console.log('Below is the actual message');
      console.log(this.message);
    });

    this.updateEmployeeForm.reset();
    this.popupVisible = false;

  }
}
