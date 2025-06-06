import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/user/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [
        Validators.required,
        Validators.pattern(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+?\d{1,3}[- ]?)?\d{10})$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        email: this.loginForm.value.emailOrPhone, 
        password: this.loginForm.value.password
      };
      this.userService.login(data).subscribe({
        next: (result: any) => {
          console.log('Login successful:', result);
          localStorage.setItem('authToken', result.id);
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
          console.error('Login error:', err);

        }
      });
    }
  }
}