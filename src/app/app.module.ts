import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import {ToastrModule, ToastrService} from 'ngx-toastr';
import {Globals} from './shared/globals';
import {AddEmployeeModalComponent} from './shared/add-modal/add-modal.component';
import {DeleteEmployeeModalComponent} from './shared/delete-modal/delete-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpService} from './shared/http.service';
import { Utils } from './shared/utils';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SettingsServices} from './shared/services/settings.services';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            maxOpened: 0,
            autoDismiss: true,
            preventDuplicates: true
        })
    ],
    declarations: [AppComponent, AddEmployeeModalComponent, DeleteEmployeeModalComponent],
    providers: [AuthGuard, Utils, Globals, HttpService, SettingsServices],
    bootstrap: [AppComponent],
    entryComponents: [AddEmployeeModalComponent, DeleteEmployeeModalComponent]
})
export class AppModule {}
