import { Component } from '@angular/core';

import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mini-NETFLIX';

  constructor(public auth: AuthService) { }
  
}
