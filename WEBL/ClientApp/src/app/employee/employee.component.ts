import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../../../../Models/company.model';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';
import notify from 'devextreme/ui/notify';
import { DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxFormModule, DxButtonModule, DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: Employee;
  companyList: Company[];
  companyNameList: string[] = [];
  curCompanyName: string;
  companyName: string;
  employeeList: Employee[];

  labelLocation: string;
  minColWidth: number;
  colCount: number;
  width: any;
  popupVisible = false;

  buttonOptions = {
    text: 'Update',
    type: 'success',
    useSubmitBehavior: true
  };

  //////////////////////////////////////////////
  /*
    Constructor
      Used to set the dataService and to set the defualt values for the form and fetch the employee's company
   */
  constructor(private dataService: DataService) {
    this.labelLocation = 'top';
    this.minColWidth = 500;
    this.colCount = 2;

    // Find the employee's company to display
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      const curCompany = this.companyList.find(i => i.companyId === this.employee.companyId);
      this.curCompanyName = curCompany.name;
    });

  }

  //////////////////////////////////////////////
  /*
    Code to be executed as soon as the component is initialised
   */
  ngOnInit() {

  }

  //////////////////////////////////////////////
  /*
    The update employee was clicked
      Find the company's id associated with the company's name for the employee to be updated
   */
  updateNewEmployee() {
    this.popupVisible = true;
    console.log(this.employee);

    // Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      console.log(this.companyList);

      // populate to display
      this.companyList.forEach((element) => {
        this.companyNameList.push(element.name);
      });

    });

  }

  //////////////////////////////////////////////
  /*
    Update employee to be added to the database
      Called by the form (popup) - update the employee and call the API call to update our employee's details
   */
  onFormSubmit() {

    this.popupVisible = false;
    this.companyName = String(this.employee.companyId);
    const curComp = this.companyList.find(i => i.name === this.companyName);
    this.employee.companyId = curComp.companyId;

    // Update Existing Employee
    this.dataService.updateEmployee(this.employee).subscribe(data => {
      const message = data;
      console.log(message);

      notify({
        message: 'You have submitted the form',
        position: {
          my: 'center top',
          at: 'center top'
        }
      }, 'success', 1000);

    });

  }

  //////////////////////////////////////////////
  /*
    Create a confirmation popup
      Ask the user if the employee should be deleted and delete if confirmed
   */
  deleteConfirmation(name: string, surname: string) {

    if (confirm('Are you sure to delete ' + name + ' ' + surname)) {
      // Delete Existing Employee
      this.dataService.deleteEmployee(this.employee.employeeId).subscribe(data => {
        const message = data;
        console.log(message);
        // Show All Employees
        this.dataService.getAllEmployees().subscribe(empData => {
          this.employeeList = empData;
        });
      });
    }
  }

}
