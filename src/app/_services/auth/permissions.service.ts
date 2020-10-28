import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private pagesAndPermissions: any = [];

  constructor() {
    this.pagesAndPermissions = JSON.parse(localStorage.getItem('pages-and-permissions'));
  }

  hasPermission(page: string, permission: string): boolean {
    let hasPermission = false;

    if (typeof this.pagesAndPermissions !== 'object') {
      return false;
    }

    this.pagesAndPermissions.forEach((p) => {
      if (p.name === page && p.pivot[permission]) {
        hasPermission = true;
        return;
      }
    });

    return hasPermission;
  }
}
