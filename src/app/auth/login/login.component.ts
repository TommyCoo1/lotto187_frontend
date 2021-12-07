import { Router } from '@angular/router';
import { LoginDto } from './../shared/login.dto';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.min(5)])),
  });
  constructor(private fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const loginDto = this.loginForm.value as LoginDto;
    this._auth.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(token => {
        if(token && token.access_token){
          this._router.navigateByUrl('');
        }
        //console.log('Token: ', token);
      });
    //console.log('loginfo: ', this.loginForm.value)
  }

}
