import { Injectable } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  private readonly storageKey = 'heroes';
  constructor() { }

  getAllHeroes(): Hero[] {
    return this.getItemsFromStorage();
  }

  filterHeroesByName(searchString: string): Hero[]{
    const heroes = this.getItemsFromStorage();
    return heroes.filter(hero => hero.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  createItem(hero: Hero): void {
    const heroes = this.getItemsFromStorage();
    heroes.push(hero);
    this.saveItemsToStorage(heroes);
  }

  deleteHero(id: number): void {
    const items = this.getItemsFromStorage();
    const index = items.findIndex(h => h.id === id)
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
      this.saveItemsToStorage(items);
    }
  }

  public getNextId(): number{
    const items = this.getItemsFromStorage();
    return items.length + 1;
  }


  private getItemsFromStorage(): Hero[] {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveItemsToStorage(items: Hero[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
