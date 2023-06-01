import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private userPermissions: { userId: string, permission: string }[] = [];
  private selectedPermission: string = '';

  updateUserPermissions(permissions: any[]) {
    this.userPermissions = permissions.map((permission) => {
      const userPermission = {
        userId: permission.userId,
        permission: this.getPermission(this.selectedPermission),
      };
      console.log('User Permission:', userPermission.permission);
      return userPermission;
    });
  }

  isAddButtonDisabled(): boolean {
    return this.userPermissions.some(permission => permission.permission === 'Lecture_seule');
  }

  isDeleteButtonDisabled(): boolean {
    return this.userPermissions.some(permission =>
      permission.permission === 'Lecture_seule' || permission.permission === 'membre_sans_suppression');
  }

  getPermission(selectedPermission: string): string {
    if (selectedPermission === 'Lecture_seule') {
      return 'Lecture_seule';
    } else if (selectedPermission === 'membre_sans_suppression') {
      return 'membre_sans_suppression';
    } else if (selectedPermission === 'membre_avec_suppression') {
      return 'membre_avec_suppression';
    } else {
      return 'Control_total';
    }
  }

  // selected Permissions 
  setSelectedPermission(selectedPermission: string) {
    this.selectedPermission = selectedPermission;
  }
  
  
}
