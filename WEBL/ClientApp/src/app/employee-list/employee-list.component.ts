import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { Company } from '../../../../Models/company.model';
import notify from 'devextreme/ui/notify';
import { FormControl, FormGroup } from '@angular/forms';
import { DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxFormModule, DxFormComponent } from 'devextreme-angular';
import dxForm from 'devextreme/ui/form';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: Employee;
  employeeList: Employee[];
  companyList: Company[];
  companyNameList: string[] = [];

  labelLocation: string;
  minColWidth: number;
  colCount: number;
  width: any;
  popupVisible = false;

  buttonOptions = {
    text: 'Create',
    type: 'success',
    useSubmitBehavior: true
  };

  //////////////////////////////////////////////
  /*
    Constructor
      Used to set the dataService and to set the defualt values for the form
   */
  constructor(private dataService: DataService) {
    this.labelLocation = 'top';
    this.minColWidth = 500;
    this.colCount = 2;
  }

  //////////////////////////////////////////////
  /*
    Code to be executed as soon as the component is initialised
      We get all the employees, companies and we subsribe to the event emitter
   */
  ngOnInit() {

    this.getAllEmployees();

    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;

      // populate to display
      this.companyList.forEach((element) => {
        this.companyNameList.push(element.name);
      });

    });

    // subscribe to the emitChange event emitter
    this.dataService.emitChange.subscribe(data => {
      const message = data;
      console.log(message);
      this.getAllEmployees();
    });

  }

  //////////////////////////////////////////////
  /*
    Function to call the API call to fetch all employees
      Used to show all the employees
   */
  getAllEmployees() {
    this.dataService.getAllEmployees().subscribe(data => {
      this.employeeList = data;
    });
  }

  //////////////////////////////////////////////
  /*
    The add new new employee button was clicked
      here we set the defualt values
   */
  addNewEmployee() {
    this.popupVisible = true;
    this.employee = {
      employeeId: 0,
      name: 'Enter Name',
      surname: 'Enter Surname',
      email: 'name@test.com',
      address: 'Enter Address',
      salary: 0,
      companyId: 0
    };
  }

  //////////////////////////////////////////////
  /*
    Submit employee to be added to the database
      Called by the form (popup)
   */
  submitEmployee() {

    this.popupVisible = false;
    const companyName = String(this.employee.companyId);
    const curComp = this.companyList.find(i => i.name === companyName);
    this.employee.companyId = curComp.companyId;
    console.log(this.employee);

    // Add the new employee
    this.dataService.addEmployee(this.employee).subscribe(data => {
      const message = data;
      console.log(message);

      notify({
        message: 'The employee was added successfully',
        position: {
          my: 'center top',
          at: 'center top'
        }
      }, 'success', 3000);
    });

  }

}
