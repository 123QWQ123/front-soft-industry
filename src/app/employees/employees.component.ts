import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { Employees } from "../shared/models/Employees";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employees[];
  baseUrl: string = `${environment.baseServUrl}`;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getEmployees().subscribe(data => { this.employees = data;} );
  }

}
