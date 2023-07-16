import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/heroService/hero.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginated-list',
  templateUrl: './paginated-list.component.html',
  styleUrls: ['./paginated-list.component.css'],
})
export class PaginatedListComponent implements OnInit {
  allHeroes: Hero[] = [];
  pagedObjects: Hero[] = [];
  totalObjects = 0;
  pageSize = 10;
  currentPage = 0;
  searchValue = '';

  constructor(
    private heroService: HeroService,
    public modal: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadObjects();
  }

  public loadObjects() {
    this.allHeroes = this.heroService.filterHeroesByName(this.searchValue);
    this.totalObjects = this.allHeroes.length;
    this.updatePagedObjects(this.allHeroes);
  }

  public onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadObjects();
  }

  public onSearchChange($event: any) {
    const value = $event.target.value;
    this.searchValue = value.trim().toLowerCase();
    this.loadObjects();
  }

  private updatePagedObjects(objects: Hero[]) {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedObjects = objects.slice(startIndex, endIndex);
  }

  public editHero(hero: Hero): void {
    this.router.navigate(['/hero-detail', hero.id]);
  }

  public openDeleteConfirmationDialog(hero: Hero): void {
    const dialogRef = this.modal.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteHero(hero);
      }
    });
  }

  private deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero.id);
    this.loadObjects();
  }
}
