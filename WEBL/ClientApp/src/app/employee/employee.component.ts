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

  updateEmployeeForm: DxFormComponent;
  popupVisible = false;
  message;

  buttonOptions = {
    text: 'Update',
    type: 'success',
    useSubmitBehavior: true
  };

  labelLocation: string;
  minColWidth: number;
  colCount: number;
  width: any;

  constructor(private dataService: DataService) {
    this.labelLocation = 'top';
    this.minColWidth = 500;
    this.colCount = 2;

    //Find the employee's company to display
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      const curCompany = this.companyList.find(i => i.companyId === this.employee.companyId);
      this.curCompanyName = curCompany.name;
    });

  }

  ngOnInit() {

  }

  /*
    button clicked to open popup
   */
  updateNewEmployee() {
    this.popupVisible = true;
    console.log(this.employee);

    //Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      console.log(this.companyList);

      //populate to display
      this.companyList.forEach((element) => {
        this.companyNameList.push(element.name);
      });

    });

  }

  /*
    When the form is being submitted
   */
  onFormSubmit() {

    this.companyName = String(this.employee.companyId);
    const curComp = this.companyList.find(i => i.name === this.companyName);
    this.employee.companyId = curComp.companyId;

    //Update Existing Employee
    this.dataService.updateEmployee(this.employee).subscribe(data => {
      this.message = data;
      console.log(this.message);

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

  /*
    Ask user for confirmation of deletion of employee
   */
  deleteConfirmation(name: string, surname: string) {
    if (confirm('Are you sure to delete ' + name + ' ' + surname)) {
      //Delete Existing Employee
      this.dataService.deleteEmployee(this.employee.employeeId).subscribe(data => {
        this.message = data;
        console.log(this.message);
          //Show All Employees
          this.dataService.getAllEmployees().subscribe(empData => {
            this.employeeList = empData;
          });
      });
    }
  }


}
