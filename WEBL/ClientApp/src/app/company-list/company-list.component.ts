import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../Models/company.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companyList: Company[];

  //////////////////////////////////////////////
  /*
    Constructor
      Used to set the dataService and to set the defualt values for the form
   */
  constructor(private dataService: DataService) {
  }

  //////////////////////////////////////////////
  /*
    Code to be executed as soon as the component is initialised
      We fetch all of the companies
   */
  ngOnInit() {
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
    });
  }

}
