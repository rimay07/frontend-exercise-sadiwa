import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Globals} from './globals';
import {Observable} from 'rxjs';

const baseURL = 'https://tworks-exercise-api.herokuapp.com/employee/';

@Injectable()

// tslint:disable-next-line:class-name

export class HttpService implements OnInit {

    constructor(private http: HttpClient,
                private globals: Globals) {
    }

    ngOnInit(): void {
    }

    public getEmployeeList(): Observable<any> {
        const sessionURL = baseURL + 'list';
        return this.http.get(sessionURL);
    }

    public employeeAction(details, method): Observable<any> {
        const URL = baseURL +  method;

        switch (method) {
            case 'add':
                console.log(URL);
                return  this.http.post(URL, JSON.stringify(details));
                break;
            case 'delete':
                let tempURL = URL + '/' + details;
                console.log(tempURL);
                return this.http.delete(tempURL);
                break;
        }


    }
}
