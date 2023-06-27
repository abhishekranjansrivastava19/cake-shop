import { Component, OnInit } from "@angular/core";
import { UsersService } from "@bluebits/product";

@Component({
  selector: "bluebits-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit{

  constructor (private userService: UsersService) {

  }

  ngOnInit(): void {
    this.userService.initAppSession()
  }
  title = "ngshop";
}
