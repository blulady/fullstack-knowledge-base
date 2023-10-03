import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userName = '';
  onCreateUser() {
    if (this.userName) {
      this.userName = "";
    }
  }
}
