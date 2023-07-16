import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/services/heroService/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroName= '';
  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    //TODO: checks validity of form
    const newHero = {
      id: this.heroService.getNextId(),
      name:this.heroName
    }
    this.heroService.createItem(newHero)
    this.router.navigate(['/heroes'])
  }

}
