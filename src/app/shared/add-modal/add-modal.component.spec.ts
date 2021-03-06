import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeModalComponent } from './add-modal.component';

describe('AddEmployeeModalComponent', () => {
  let component: AddEmployeeModalComponent;
  let fixture: ComponentFixture<AddEmployeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
