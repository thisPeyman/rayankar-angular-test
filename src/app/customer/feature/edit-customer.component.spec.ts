import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomerStore } from '../data-access/store/customer.store';

import { EditCustomerComponent } from './edit-customer.component';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        EditCustomerComponent,
        CustomerStore,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      imports: [MatSnackBarModule],
    });

    component = TestBed.inject(EditCustomerComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const activatedRouteStub = {
  url: of(null),
  params: of(null),
};
