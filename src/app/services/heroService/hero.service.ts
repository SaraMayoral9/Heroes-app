import { Injectable } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {


  private readonly storageKey = 'heroes';
  constructor() { }

  getAllHeroes(): any[] {
    return this.getItemsFromStorage();
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


  private getItemsFromStorage(): any[] {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  private saveItemsToStorage(items: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
