import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuardService } from './services/authguard/auth-guard.service';
import { ReminderComponent } from './components/reminder/reminder.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'note', pathMatch: 'full' },
      {
        path: 'note',
        loadComponent: () =>
          import('./components/note/note.component').then(
            m => m.NoteComponent
          )
      },
      {
        path: 'archive',
        loadComponent: () =>
          import('./components/archive/archive.component').then(
            m => m.ArchiveComponent
          )
      },
      {
        path: 'trash',
        loadComponent: () =>
          import('./components/trash/trash.component').then(
            m => m.TrashComponent
          )
      },
      {
        path: 'reminders',
        loadComponent: () =>
          import('./components/reminder/reminder.component').then(
            m => m.ReminderComponent
          )
      }
    ]
  }
];
