import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CustomerFormComponent,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit value when form is empty', () => {
    const submitButton = fixture.debugElement.query(
      By.css('[data-test="submit-button"]')
    );

    const observerSpy = subscribeSpyTo(component.confirm);

    submitButton.nativeElement.click();

    expect(observerSpy.getLastValue()).toBeUndefined();
  });

  it('should validate email properly', () => {
    component.form.patchValue({ email: '1234' });

    expect(component.form.controls.email.invalid).toBeTrue();

    component.form.patchValue({ email: '1234@gmail.com' });

    expect(component.form.controls.email.valid).toBeTrue();
  });

  it('should validate phoneNumber properly', () => {
    component.form.patchValue({ phoneNumber: '1234' });

    expect(component.form.controls.phoneNumber.invalid).toBeTrue();

    component.form.patchValue({ phoneNumber: '+989302104598' });

    expect(component.form.controls.phoneNumber.valid).toBeTrue();
  });

  it('should patch value from parent through @Input', () => {
    const testValue = { firstName: 'peyman' };

    component.formValue = testValue;

    expect(component.form.value.firstName).toBe(testValue.firstName);
  });

  it('should emit value when form is full and valid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('[data-test="submit-button"]')
    );

    const observerSpy = subscribeSpyTo(component.confirm);

    const formValue = {
      bankAccountNumber: '1212121',
      dateOfBirth: '2022-12-22T12:08:37.274Z',
      email: 'this@gmail.com',
      firstName: 'Peyman',
      lastName: 'Khosravi',
      phoneNumber: '+989362507047',
    };

    component.form.setValue(formValue);

    fixture.detectChanges();

    submitButton.nativeElement.click();

    expect(observerSpy.getLastValue()).toEqual(formValue);
  });
});
