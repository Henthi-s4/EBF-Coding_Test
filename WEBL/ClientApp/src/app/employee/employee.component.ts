import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from '../../../../Models/company.model';
import { Employee } from '../../../../Models/employee.model';
import { DataService } from '../data.service';
import notify from 'devextreme/ui/notify';
import { DxCheckBoxModule, DxSelectBoxModule, DxNumberBoxModule, DxFormModule, DxButtonModule, DxFormComponent} from 'devextreme-angular';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: Employee;
  companyList: Company[];
  companyNameList: string[] = [];
  companyName: string;

  updateEmployeeForm: DxFormComponent;
  popupVisible = false;
  message;

  buttonOptions = {
    text: "Update",
    type: "success",
    useSubmitBehavior: true
  }

  labelLocation: string;
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

  /*
    button clicked to open popup
   */
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
    });

  }

  /*
    When the form is being submitted
   */
  onFormSubmit() {

    this.companyName = String(this.employee.companyId);
    let curComp = this.companyList.find(i => i.name === this.companyName);
    this.employee.companyId = curComp.companyId;

    console.log('what we will be sending to database');
    console.log(this.employee);

    //Update Existing Employee
    this.dataService.updateEmployee(this.employee).subscribe(data => {
      this.message = data;
      console.log(this.message);

      this.popupVisible = false;
      notify({
        message: "You have submitted the form",
        position: {
          my: "center top",
          at: "center top"
        }
      }, "success", 3000);

    });

  }

}
