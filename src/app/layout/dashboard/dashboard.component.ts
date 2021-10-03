import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddEmployeeModalComponent} from '../../shared/add-modal/add-modal.component';
import {DeleteEmployeeModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {HttpService} from '../../shared/http.service';
import {Globals} from '../../shared/globals';
import {SettingsServices} from '../../shared/services/settings.services';

// declare var Hello: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public employeeList;
    public tableHeaderArr = ["ID", "First Name", "Last Name", "Email"];
    public tableColArr = ["id", "firstName", "lastName", "email"];
    /*public employeeList = [
            {
                "firstName":"Grace",
                "lastName":"Reyes",
                "email":"g@yahoo.com",
                "id":"00867"
            },
            {
                "firstName":"Mark",
                "lastName":"Cruz",
                "email":"m@yahoo.com",
                "id":"00123"
            },
            {
                "firstName":"Meredith",
                "lastName":"Gomez",
                "email":"mg@yahoo.com",
                "id":"00343"
            }
        ];*/
    public tableHeight = window.innerHeight * .61;

constructor(public toastr: ToastrService,
                public modalService: NgbModal,
                public http: HttpService,
                public globals: Globals,
                public settings: SettingsServices) {
    }

    ngOnInit() {
       this.loadEmployeeDetails();
       this.settings.onEmployeeActionComplete.subscribe(() => {
           this.loadEmployeeDetails();
       })
    }

    public loadEmployeeDetails() {
        this.http.getEmployeeList().subscribe((data) => {
            this.employeeList = data;
            console.log("Employee List : " , this.employeeList);
            this.setEmployeeID();
        })
    }

    private setEmployeeID(){
        let tempArr = [];
        this.employeeList.forEach((employee) => {
            tempArr.push(employee.id);
        })

        this.globals.setEmployeeID(tempArr);

        console.log(this.globals.getEmployeeID());
    }

    private loadModal(code) {
        let currentModal;
        switch (code){
            case 1:
                currentModal = AddEmployeeModalComponent;
                break;
            case 2:
                currentModal = DeleteEmployeeModalComponent;
                break;
        }
        const modalRef = this.modalService.open(currentModal, {centered: true});
        modalRef.componentInstance.name = 'World';

    }
}
