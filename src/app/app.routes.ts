import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserViewComponent } from './components/user-view/user-view.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'create-user', component: UserFormComponent },
    { path: 'edit/:id', component: UserFormComponent },
    { path: 'view/:id', component: UserViewComponent },
];
