import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommitListItemComponent } from './components/commit-list-item/commit-list-item.component';
import { CommitListComponent } from './components/commit-list/commit-list.component';

@NgModule({
  declarations: [AppComponent, CommitListComponent, CommitListItemComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
