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

  employeeList: Employee[];
  popupVisible = false;
  currentEmployee: Employee;
  companyList: Company[];
  companyNameList: string[] = [];

  labelLocation: string;
  minColWidth: number;
  colCount: number;
  width: any;
  buttonOptions = {
    text: 'Create',
    type: 'success',
    useSubmitBehavior: true
  };

  employee: Employee;
  //{
  //  employeeId: 0,
  //  name: '',
  //  surname: '',
  //  email: '',
  //  address: '',
  //  salary: 0,
  //  companyId: 0
  //};

  constructor(private dataService: DataService) {
    this.labelLocation = 'top';
    this.minColWidth = 500;
    this.colCount = 2;
  }

  ngOnInit() {

    this.getAllEmployees();

    //Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;

      //populate to display
      this.companyList.forEach((element) => {
        this.companyNameList.push(element.name);
      });

    });

    //subscribe to the emitDelete event emitter
    this.dataService.emitDelete.subscribe(data => {
      const message = data;
      console.log(message);
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

  /*
    Submit employee to be added to the database
      Called by the form (popup)
   */
  submitEmployee() {

    const companyName = String(this.employee.companyId);
    const curComp = this.companyList.find(i => i.name === companyName);
    this.employee.companyId = curComp.companyId;
    console.log(this.employee);

    //Add A New Employee
    this.dataService.addEmployee(this.employee).subscribe(data => {
      const message = data;
      console.log(message);

      this.popupVisible = false;
      notify({
        message: 'You have submitted the form',
        position: {
          my: 'center top',
          at: 'center top'
        }
      }, 'success', 3000);
    });

  }

}


