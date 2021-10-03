import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpService} from '../../shared/http.service';
import {Globals} from '../../shared/globals';
import {ToastrService} from 'ngx-toastr';
import {Utils} from '../../shared/utils';
import {SettingsServices} from '../services/settings.services';


@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.component.html',
    styleUrls: ['./delete-modal.component.scss'],
    animations: [routerTransition()]
})

export class DeleteEmployeeModalComponent{

    fm: FormGroup;
    public employeeID: string;

    constructor(public activeModal: NgbActiveModal,
                public modalService: NgbModal,
                private fb: FormBuilder,
                public http: HttpService,
                public globals: Globals,
                public toastrService: ToastrService,
                private utils: Utils,
                private settings: SettingsServices) {
        this.createDeleteForm();
    }

    private createDeleteForm() {
        this.fm = this.fb.group({
            employeeID: ['']
        });
    }

    public deleteEmployee(employeeID) {
        const idExist = this.checkEmployeeID(employeeID);
        if(!idExist){
            this.toastrService.error('Error cannot delete invalid Employee details. Please enter a valid ID');
            setTimeout(()=> {
                this.modalService.dismissAll();
            }, 3000);
            return;
        } else {
            this.http.employeeAction(employeeID, "delete").subscribe((resp) => {
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
