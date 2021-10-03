import {Injectable} from '@angular/core';
import {Globals} from '../shared/globals';

@Injectable()
export class Utils {

    constructor(private globals: Globals) {
    }

    public isEmailAddress(str) {
        let pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    }

    public isNotEmpty (str) {
        let pattern =/\S+/;
        return pattern.test(str);  // returns a boolean
    }
    public isNumber(str) {
        let pattern = /^\d+$/;
        return pattern.test(str);  // returns a boolean
    }
    public isIDUnique(num){
        let idArray: any[];
        idArray = this.globals.getEmployeeID();
        if (idArray.length == 0) return true;
        else return idArray.includes(num);
    }
}
