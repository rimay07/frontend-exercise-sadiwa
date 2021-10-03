import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpService} from '../../shared/http.service';
import {Globals} from '../../shared/globals';
import {Utils} from '../../shared/utils';
import {ToastrService} from 'ngx-toastr';
import { SettingsServices } from '../services/settings.services';

@Component({
    selector: 'app-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss'],
    animations: [routerTransition()]
})

export class AddEmployeeModalComponent{
    fm: FormGroup;
    public firstName: string;
    public lastName: string;
    public email: string;
    public id: string;

    constructor(public activeModal: NgbActiveModal,
                public modalService: NgbModal,
                private fb: FormBuilder,
                public http: HttpService,
                public globals: Globals,
                public toastrService: ToastrService,
                private utils: Utils,
                private settings: SettingsServices) {
        this.createRegistrationForm();
    }

    private createRegistrationForm() {
        this.fm = this.fb.group({
            firstName: [''],
            lastName: [''],
            email: [''],
            id: ['']
        });
    }

    //Function to add Employee details

    public addEmployee(firstName, lastName, email, id) {

        const empDetails = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'id': id
        };

        const idExist = this.checkEmployeeID(id);
        const isValidEmail = this.utils.isEmailAddress(email);
        if(!idExist || !isValidEmail){
            this.toastrService.error('Error cannot save invalid Employee details.');
            setTimeout(()=> {
                this.modalService.dismissAll();
            }, 3000);
            return;
        } else {
            this.http.employeeAction(empDetails, "add").subscribe((resp) => {
                if (resp && resp.success){
                    this.toastrService.success(resp.msg);
                    this.settings.employeeComplete();
                }
            })
        }

        this.modalService.dismissAll();
    }

    private checkEmployeeID(id) {
        let isNumber = this.utils.isNumber(id);
        let isNotEmpty = this.utils.isNotEmpty(id);
        let isIDUnique = this.utils.isIDUnique(id);
        return isNumber && isNotEmpty && isIDUnique;
    }
}
