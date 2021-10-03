import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
    public employeeID:Array<number>;

    constructor () {}

    public setEmployeeID(arr){
        this.employeeID = arr;
    }

    public getEmployeeID(){
        return this.employeeID;
    }
}

