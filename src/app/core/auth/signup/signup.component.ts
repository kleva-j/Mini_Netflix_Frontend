import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toaster: ToastService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  validateForm() {
    const { controls } = this.signupForm;
    controls.password.status === 'INVALID' && this.toaster.sendMessage('error', {
      title: 'Signup Error',
      message: 'Password is not valid'
    });
    controls.email.status === 'INVALID' && this.toaster.sendMessage('error', {
      title: 'Signup Error',
      message: 'Email is not valid'
    });
    controls.username.status === 'INVALID' && this.toaster.sendMessage('error', {
      title: 'Signup Error',
      message: 'Username is not valid'
    });    
  }

  onSubmit(event) {
    event.preventDefault();
    this.loading = true;
    const { status, value: { username, email, password } } = this.signupForm;
    if (status === 'INVALID') this.validateForm();
    else this.auth.userSignupWithCredentials({ email, password, photoURL: '', displayName: username });
    return this.loading = false;
  }

}
