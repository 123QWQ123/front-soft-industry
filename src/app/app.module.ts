import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CreateEmployeesComponent } from './create-employees/create-employees.component';
import { RouterModule, Routes } from "@angular/router";
import { UserService } from "./user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeesComponent } from './employees/employees.component';

const appRoutes: Routes = [
    {path: '', component: EmployeesComponent, pathMatch: 'full'},
    {path: 'create', component: CreateEmployeesComponent, pathMatch: 'full'}
    //TODO create page 404
    // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
    declarations: [
        AppComponent,
        CreateEmployeesComponent,
        EmployeesComponent,
    ],
    imports: [
        BrowserModule,
        BsDropdownModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        ),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
