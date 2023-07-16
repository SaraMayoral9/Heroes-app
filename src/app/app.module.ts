import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginatedListComponent } from './components/paginated-list/paginated-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CapitalizeDirective } from './shared/directives/capitalize.directive';
@NgModule({
  declarations: [
    AppComponent,
    PaginatedListComponent,
    HeroDetailComponent,
    DeleteConfirmationComponent,
    CapitalizeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[
    MatFormFieldModule,
  ],
  entryComponents:[DeleteConfirmationComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
