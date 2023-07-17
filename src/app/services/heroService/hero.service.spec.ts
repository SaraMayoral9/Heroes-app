import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });
  afterEach(() => {
    localStorage.removeItem('heores');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the storage', () => {
    const hero = { id: 1, name: 'hero1'};
    service.createItem(hero);
    const storedItems = JSON.parse(localStorage.getItem('heroes') || '[]');
    expect(storedItems).toContain(hero);
  });

  it('should retrieve all items from the storage', () => {
    const hero1 = { id: 1,name: 'hero1'};
    const hero2 = { id: 2,name: 'hero2'};
    localStorage.setItem('heroes', JSON.stringify([hero1, hero2]));
    const items = service.getAllHeroes();
    expect(items).toEqual([hero1, hero2]);
  });

  it('should update an existing item in the storage', () => {
    const hero1 = { id: 1,name: 'hero1'};
    const hero2 = { id: 2,name: 'hero2'};
    localStorage.setItem('heroes', JSON.stringify([hero1, hero2]));
    const updatedItem = { id: 1,name: 'hero1Updated'};
    service.editHero(updatedItem);
    const storedItems = JSON.parse(localStorage.getItem('heroes') || '[]');
    expect(storedItems[0]).toEqual(updatedItem);
  });

  it('should delete an item from the storage', () => {
    const hero1 = { id: 1,name: 'hero1'};
    const hero2 = { id: 2,name: 'hero2'};
    localStorage.setItem('heroes', JSON.stringify([hero1, hero2]));
    service.deleteHero(1);
    const storedItems = JSON.parse(localStorage.getItem('heroes') || '[]');
    expect(storedItems).toEqual([hero2]);
  });

  it('should filter items based on a property value', () => {
    const hero1 = { id: 1,name: 'hero1'};
    const hero2 = { id: 2,name: 'hero2'};
    const hero3 = { id: 3,name: 'superlopez'};
    localStorage.setItem('heroes', JSON.stringify([hero1, hero2, hero3]));
    const filteredItems = service.filterHeroesByName('hero');
    expect(filteredItems.length).toEqual(2);
  });
});
