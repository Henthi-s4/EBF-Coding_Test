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

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    //Find All Companies
    this.dataService.getAllCompanies().subscribe(data => {
      this.companyList = data;
      //console.log('List of all Companies');
      //console.log(this.companyList);
    });
  }

}
