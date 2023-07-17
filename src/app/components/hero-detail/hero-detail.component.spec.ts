import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/heroService/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;

  const dummyHero: Hero = {
    id: 1,
    name: 'Test Hero',
  };

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroById', 'getNextId', 'createItem', 'editHero']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = {
      params: of({ id: '1' }),
    };

    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
    heroService.getHeroById.and.returnValue([dummyHero]);
    heroService.getNextId.and.returnValue(2);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load hero details on initialization', () => {
    expect(component.hero).toEqual(dummyHero);
  });

  it('should create a form with hero details', () => {
    expect(component.form.value).toEqual(dummyHero);
  });

  it('should navigate to /heroes after form submission', () => {
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });

  it('should call addNewHero when the hero is not available', () => {
    component.hero = null as unknown as Hero;
    component.onSubmit();
    expect(heroService.createItem).toHaveBeenCalled();
  });

  it('should call editHero when the hero is available', () => {
    component.onSubmit();
    expect(heroService.editHero).toHaveBeenCalled();
  });
});