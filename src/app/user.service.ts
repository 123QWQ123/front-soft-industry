import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../environments/environment";
import { Employees } from "./shared/models/Employees";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    create(file: File): Observable<HttpEvent<{}>>
    {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        const req = new HttpRequest('POST', '/user', formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    getEmployees(): Observable<Employees[]> {
        return this.http.get<Employees[]>(`${environment.apiUrl}/employees`);
    }

    createEmployee(employee) {
        const formdata: FormData = new FormData();
        formdata.append('name', employee.name);
        formdata.append('surname', employee.surname);
        formdata.append('patronymic', employee.patronymic);
        formdata.append('sociability', employee.sociability);
        formdata.append('engineeringSkill', employee.engineeringSkill);
        formdata.append('timeManagement', employee.timeManagement);
        formdata.append('knowledgeOfLanguages', employee.knowledgeOfLanguages);
        formdata.append('projectId', employee.projectsId);

        if (employee.avatar) {
            formdata.append('avatar', employee.avatar);
        }

        return this.http.post(`${environment.apiUrl}/employee`, formdata);
    }

    getProjects(): Observable<Object[]> {
        return this.http.get<Object[]>(`${environment.apiUrl}/projects`);
    }
}