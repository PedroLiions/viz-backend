import {Component, Input} from '@angular/core';
import {UsersService} from '../../../../../_services/http/configuration/users.service';
import {User} from '../../../../../_models/User';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {

  user: User;

  pages;

  @Input() set userLoad(user: User) {
    if (typeof user === 'undefined') {
      return;
    }

    this.user = user;

    this.load();
  }

  constructor(
    private usersService: UsersService
  ) {
  }

  load(): void {
    this.usersService.pages(this.user.id).subscribe(response => {
      this.pages = response.user_pages;
    });
  }

  updatePermissions(): void {
    const submittedFields = {
      pagesAndPermissions: this.pages,
      user: this.user
    };

    this.usersService.updateUser(this.user.id, submittedFields).subscribe(response => {
      console.log(response);
    });
  }

}
