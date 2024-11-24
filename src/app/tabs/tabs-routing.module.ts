import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'home/book/:isbn',
        loadChildren: () => import('../book/book.module').then(m => m.BookPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'library',
        loadChildren: () => import('../library/library.module').then(m => m.LibraryPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'library/book/:isbn',
        loadChildren: () => import('../book/book.module').then(m => m.BookPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'search/book/:isbn',
        loadChildren: () => import('../book/book.module').then(m => m.BookPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
