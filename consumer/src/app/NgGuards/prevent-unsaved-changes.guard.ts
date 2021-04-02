import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionEditComponent } from '../connections/connection-edit/connection-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: ConnectionEditComponent): boolean {
      if (component.editForm.dirty) {
        return confirm('Are you sure you want to exit without saving the changes?')
      }
    return true;
  }
  
}
