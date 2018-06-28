import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: 'form-upload',
    templateUrl: './create-employees.component.html',
    styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {


    employeesForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        surname: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        patronymic: new FormControl('', [Validators.required, Validators.maxLength(15)]),
        sociability: new FormControl(0, [Validators.pattern('[0-9]+'), Validators.maxLength(2)]),
        engineeringSkill: new FormControl(0, [Validators.pattern('[0-9]+'), Validators.maxLength(2)]),
        timeManagement: new FormControl(0, [Validators.pattern('[0-9]+'), Validators.maxLength(2)]),
        knowledgeOfLanguages: new FormControl(1, [Validators.pattern('[0-9]+'), Validators.maxLength(2)]),
        avatar: new FormControl(),
    });
    fileToUpload: File = null;
    projects: any = null;
    checkProjects: any = [];
    imgUrl: string = '';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getProjects().subscribe(data => {
            if (data instanceof Array) {
                this.projects = data.map( item => {
                    item.check = false;

                    return item;
                });
            }
        })
    }

    imageUpload(files: FileList) {
        let reader = new FileReader();
        this.fileToUpload = files.item(0);

        reader.readAsDataURL(this.fileToUpload);
        reader.onload = (event: any) => {
            this.imgUrl = event.target.result;
        };
    }

    onFormSubmit() {
        let input = this.employeesForm.getRawValue();
        if (this.fileToUpload) {
            input.avatar = this.fileToUpload;
        }
        input.projectsId = this.checkProjects;

        this.userService.createEmployee(input).subscribe(data => {
            alert('Created!');
        })
    }

    updateCheckedProject(option, event) {
        let checked = event.target.checked;

        if (this.employeesForm.get('timeManagement').value < 10 && this.checkProjects.length >= 1) {
            this.checkProjects.length = 0;
            if (checked) {
                this.projects.map(item => {
                    item.check = false;
                    if (item.id === option.id) {
                        item.check = true;
                        this.checkProjects.push(option.id);
                    }
                    return item;
                });
            }
            return true;
        }

        this.projects.map(item => {
            if (item.id === option.id) {
                item.check = checked;
            }
            return item;
        });

        this.checkProjects.push(option.id);
        return true;
    }
}