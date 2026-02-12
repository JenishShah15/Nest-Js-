import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

//Dependency injection is a method by which we don't have to manage the object creation of the class which we try to import in order to use the functions of the imported class. So dependency injection comes into role it tells that you don't have to create or manage instance you just have to provide the reference in the constructor

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test();
  }

  @Post("signup")
  signup() {
    return this.authService.signup();
  }

  @Post("signin")
  signin() {
    return this.authService.signin();
  }
}
