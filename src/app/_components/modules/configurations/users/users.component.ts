import {Component, OnInit} from '@angular/core';
import {User} from '../../../../_models/User';
import {UsersService} from '../../../../_services/http/configuration/users.service';
import {PermissionsService} from '../../../../_services/auth/permissions.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  userIdInModal: User;

  constructor(
    private usersService: UsersService,
    private permissionsService: PermissionsService
  ) {

  }

  ngOnInit(): void {
    this.usersService.all().subscribe(response => {
      this.users = response;
    });
  }

  setUserInModal(index: number): void {
    this.userIdInModal = this.users[index];
  }

  deleteUser(id, index): void {
    this.usersService.deleteUser(id).subscribe(response => this.users.splice(index, 1));
  }

  hasPermission(permission: string): boolean {
    return this.permissionsService.hasPermission('Usuários', permission);
  }

}
