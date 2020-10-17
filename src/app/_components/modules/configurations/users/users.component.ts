import {Component, OnInit} from '@angular/core';
import {User} from '../../../../_models/User';
import {UsersService} from '../../../../_services/http/configuration/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  userIdInModal: User;

  constructor(
    private usersService: UsersService
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

}
