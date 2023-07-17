import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PaginatedListComponent } from './paginated-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroService } from 'src/app/services/heroService/hero.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/models/hero.model';
import { PageEvent } from '@angular/material/paginator';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { of } from 'rxjs';

describe('PaginatedListComponent', () => {
  let component: PaginatedListComponent;
  let fixture: ComponentFixture<PaginatedListComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
    { id: 4, name: 'Hero 4' },
    { id: 5, name: 'Hero 5' },
    { id: 6, name: 'Hero 6' },
    { id: 7, name: 'Hero 7' },
    { id: 8, name: 'Hero 8' },
    { id: 9, name: 'Hero 9' },
    { id: 10, name: 'Hero 10' },
    { id: 11, name: 'Hero 11' },
    { id: 12, name: 'Hero 12' },
    { id: 13, name: 'Hero 13' },
    { id: 14, name: 'Hero 14' },
    { id: 15, name: 'Hero 15' },
  ];

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['filterHeroesByName', 'deleteHero']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ PaginatedListComponent ],
      imports:[MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: Router, useValue: routerSpy }
      ],
    })
    .compileComponents();
  });
  beforeEach(() => {
    mockHeroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    mockMatDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    fixture = TestBed.createComponent(PaginatedListComponent);
    component = fixture.componentInstance;
    mockHeroService.filterHeroesByName.and.returnValue(mockHeroes);
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pagedObjects correctly when onPageChange is called', () => {
    const mockPageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: 15 };

    spyOn(component, 'loadObjects').and.callThrough();
    component.onPageChange(mockPageEvent);

    expect(component.currentPage).toBe(mockPageEvent.pageIndex);
    expect(component.pageSize).toBe(mockPageEvent.pageSize);
    expect(component.loadObjects).toHaveBeenCalled();
    expect(component.pagedObjects).toEqual(mockHeroes.slice(5, 10));
  });

  it('should call loadObjects() when onSearchChange is called', () => {
    spyOn(component, 'loadObjects');
    const mockEvent = { target: { value: 'test' } };
    component.onSearchChange(mockEvent);
    expect(component.loadObjects).toHaveBeenCalled();
  });

  it('should call editHero with the correct hero when editHero is called', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };
    component.editHero(mockHero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/hero-detail', mockHero.id]);
  });

  it('should call editHero with the correct hero when editHero is called', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };
    component.editHero(mockHero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/hero-detail', mockHero.id]);
  });

  it('should open delete confirmation dialog and call deleteHero on confirmation', fakeAsync(() => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };
    mockMatDialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    spyOn(component, 'loadObjects');
    
    component.openDeleteConfirmationDialog(mockHero);
    tick();
    
    expect(mockMatDialog.open).toHaveBeenCalledWith(DeleteConfirmationComponent);
    expect(component.loadObjects).toHaveBeenCalledWith();
  }));
});
