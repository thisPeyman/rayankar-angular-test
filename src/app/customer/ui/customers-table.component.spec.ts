import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Customer } from '../data-access/models/customer';

import { CustomersTableComponent } from './customers-table.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { MatTableHarness } from '@angular/material/table/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

describe('CustomersTableComponent', () => {
  let component: CustomersTableComponent;
  let fixture: ComponentFixture<CustomersTableComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersTableComponent, MatTableModule, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersTableComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', async () => {
    const customers: Partial<Customer>[] = [
      { firstName: 'Peyman', id: 'test-id' },
    ];

    component.dataSource = customers as any;
    component.displayedColumns = ['firstName', 'actions'];

    fixture.detectChanges();

    const table = await loader.getHarness(MatTableHarness);

    expect(table).toBeTruthy();
  });
});
