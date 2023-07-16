import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/heroService/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  public form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private heroService: HeroService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      const id = +params['id'];
      this.hero = this.heroService.getHeroById(id)[0];
    });
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      id: new FormControl(this.hero?.id),
      name: new FormControl(this.hero?.name, Validators.required),
    });
  }

  public onSubmit() {
    this.hero ? this.editHero() : this.addNewHero();
    this.router.navigate(['/heroes']);
  }

  private addNewHero(): void {
    const newHero = this.form.getRawValue();
    newHero.id = this.heroService.getNextId();
    this.heroService.createItem(newHero);
  }

  private editHero(): void {
    console.log(this.form.getRawValue());
    this.heroService.editHero(this.form.getRawValue());
  }
}
