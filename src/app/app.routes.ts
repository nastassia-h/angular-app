import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { canActivateAuth } from './auth/access.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { provideState } from '@ngrx/store';
import { ProfileEffects, profileFeature } from './data';
import { provideEffects } from '@ngrx/effects';
import { provideStates } from '@ngxs/store';
import { ProfileState } from './data/store/state.ngxs';
import { profileStore } from './data/store/profile.store';

export const routes: Routes = [
   {path: '', component: LayoutComponent, children: [
      {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
      {
         path: 'search', 
         component: SearchPageComponent,
         providers: [
            profileStore,
            provideStates([ProfileState]),
            provideState(profileFeature),
            provideEffects(ProfileEffects)
         ]
      },
      {path: 'settings', component: SettingsPageComponent},
      {path: 'profile/:id', component: ProfilePageComponent}
   ],
   canActivate: [canActivateAuth]
   },
   {path: 'login', component: LoginPageComponent},
];
