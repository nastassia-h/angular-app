import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { canActivateAuth, cannotActivateAuth } from './auth/access.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { provideState } from '@ngrx/store';
import { ProfileEffects, profileFeature } from './data';
import { provideEffects } from '@ngrx/effects';
import { provideStates } from '@ngxs/store';
import { ProfileState } from './data/store/state.ngxs';
import { profileStore } from './data/store/profile.store';
import { chatsRoutes } from './pages/chats/chatsRoutes';
import { FormLearningPageComponent } from './pages/form-learning-page/form-learning-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SubscribtionPageComponent } from './pages/subscribtion-page/subscribtion-page.component';
import { SubscribersPageComponent } from './pages/subscribers-page/subscribers-page.component';

export const routes: Routes = [
   {
      path: '', 
      component: LayoutComponent, 
      providers: [
         profileStore,
         provideStates([ProfileState]),
         provideState(profileFeature),
         provideEffects(ProfileEffects)
      ],
      children: [
         {path: '', redirectTo: 'profile/me', pathMatch: 'full'},
         {
            path: 'search', 
            component: SearchPageComponent
         },
         {path: 'settings', component: SettingsPageComponent},
         {path: 'subscriptions', component: SubscribtionPageComponent},
         {path: 'subscribers', component: SubscribersPageComponent},
         {path: 'profile/:id', component: ProfilePageComponent},
         {
            path: 'chats', 
            loadChildren: () => chatsRoutes
         }
      ],
   canActivate: [canActivateAuth]
   },
   {path: 'login', component: LoginPageComponent, canActivate: [cannotActivateAuth]},
   {path: 'register', component: RegisterPageComponent, canActivate: [cannotActivateAuth]},
   {path: 'formslearn', component: FormLearningPageComponent}
];
