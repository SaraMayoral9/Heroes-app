import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginatedListComponent } from './components/paginated-list/paginated-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: PaginatedListComponent },
  { path: 'hero-detail', component: HeroDetailComponent },
  { path: 'hero-detail/:id', component: HeroDetailComponent },
  { path: '**', redirectTo: '/heroes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
