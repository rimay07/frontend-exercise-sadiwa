import {EventEmitter, Injectable, OnInit} from '@angular/core';

@Injectable()

export class SettingsServices implements OnInit {
    onEmployeeActionComplete: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public employeeComplete() {
        this.onEmployeeActionComplete.emit();
    }
}
