import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
   {path: '', component: LayoutComponent, children: [
      {path: 'search', component: SearchPageComponent},
      {path: 'profile', component: ProfilePageComponent}
   ]},
   {path: 'login', component: LoginPageComponent},
];
