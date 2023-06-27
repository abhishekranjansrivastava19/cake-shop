import { Component } from '@angular/core';
import { AuthService } from '@bluebits/users';


@Component({
  selector: 'bluebits-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
   constructor (private authService: AuthService) { }

   logoutUser(){
    this.authService.logout();
   }
}
