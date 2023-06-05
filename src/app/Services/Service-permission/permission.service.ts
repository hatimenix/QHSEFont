import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private userAutorisation: string = '';

  setUserAutorisation(autorisation: string): void {
    this.userAutorisation = autorisation;
  }

  canAddOrUpdate(): boolean {
    return this.userAutorisation === 'Control_total';
  }

  canDelete(): boolean {
    return this.userAutorisation === 'Control_total';
  }

  canViewOnly(): boolean {
    return this.userAutorisation === 'Lecture';
  }
}
