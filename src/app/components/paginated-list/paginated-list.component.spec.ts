import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedListComponent } from './paginated-list.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('PaginatedListComponent', () => {
  let component: PaginatedListComponent;
  let fixture: ComponentFixture<PaginatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatedListComponent ],
      imports:[MatDialogModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
