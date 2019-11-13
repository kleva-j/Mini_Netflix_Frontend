import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toaster: ToastService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  validateForm() {
    const { controls } = this.loginForm;
    controls.email.status === 'INVALID' && this.toaster.sendMessage('error', {
      title: 'Login Error',
      message: 'Email is not valid'
    });
    controls.password.status === 'INVALID' && this.toaster.sendMessage('error', {
      title: 'Login Error',
      message: 'Password is not valid'
    });
  }
  
  onSubmit($event) {
    $event.preventDefault();
    return;
  }

  async submitCredentials() {
    this.loading = true;
    const { status, value: { email, password } } = this.loginForm;
    if (status === 'INVALID') this.validateForm();
    else await this.auth.userLoginWithCredentials(email, password);
    return this.loading = false;
  }

}
