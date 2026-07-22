import { Component, signal } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { StudentService } from '../../core/services/student.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private studentService = inject(StudentService);
  private router = inject(Router);

  formData = {
    name: '',
    email: '',
    department: '',
    year: 1,
    phone: '',
    password: '',
    confirmPassword: ''
  };

  departments = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  submitted = signal(false);
  success = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  onSubmit(form: NgForm): void {
    this.submitted.set(true);

    if (form.invalid) return;

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage.set('Passwords do not match!');
      return;
    }

    const newStudent = {
      name: this.formData.name,
      email: this.formData.email,
      department: this.formData.department,
      year: this.formData.year,
      phone: this.formData.phone,
      enrolledCourses: [],
      joinedDate: new Date().toISOString().split('T')[0],
      gpa: 0,
      avatar: ''
    };

    this.studentService.addStudent(newStudent).subscribe(student => {
      this.authService.login(student);
      this.success.set(true);
      this.errorMessage.set('');

      setTimeout(() => this.router.navigate(['/']), 2000);
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.submitted.set(false);
    this.success.set(false);
    this.errorMessage.set('');
  }
}
