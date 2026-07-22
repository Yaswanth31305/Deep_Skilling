import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CourseService } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.service';
import { Course } from '../../core/models/course.model';

function noDuplicateCourses(control: AbstractControl): ValidationErrors | null {
  const arr = control as FormArray;
  const ids = arr.controls.map(c => c.get('courseId')?.value).filter(Boolean);
  const hasDuplicates = ids.length !== new Set(ids).size;
  return hasDuplicates ? { duplicateCourses: true } : null;
}

@Component({
  selector: 'app-course-register',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './course-register.html',
  styleUrl: './course-register.css',
})
export class CourseRegister implements OnInit {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);

  availableCourses: Course[] = [];
  submitted = false;
  success = false;
  errorMessage = '';

  priorities = [1, 2, 3, 4, 5];

  form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({
      studentId: [this.authService.getCurrentStudent()?.id || '', Validators.required],
      startDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
      coursePreferences: this.fb.array(
        [this.createCoursePreference()],
        { validators: noDuplicateCourses }
      )
    });

    this.courseService.getCourses().subscribe(courses => {
      this.availableCourses = courses;
    });
  }

  createCoursePreference(): FormGroup {
    return this.fb.group({
      courseId: ['', Validators.required],
      priority: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  get coursePreferences(): FormArray {
    return this.form.get('coursePreferences') as FormArray;
  }

  addCoursePreference(): void {
    if (this.coursePreferences.length < 5) {
      this.coursePreferences.push(this.createCoursePreference());
    }
  }

  removeCoursePreference(index: number): void {
    if (this.coursePreferences.length > 1) {
      this.coursePreferences.removeAt(index);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    console.log('Course Registration Submitted:', this.form.value);
    this.success = true;
    setTimeout(() => this.router.navigate(['/courses']), 2500);
  }

  getControl(name: string): AbstractControl {
    return this.form.get(name)!;
  }

  isInvalid(name: string): boolean {
    const ctrl = this.form.get(name);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.submitted));
  }

  getPrefControl(index: number, field: string): AbstractControl {
    return this.coursePreferences.at(index).get(field)!;
  }

  isPrefInvalid(index: number, field: string): boolean {
    const ctrl = this.getPrefControl(index, field);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.submitted));
  }

  reset(): void {
    this.form.reset();
    while (this.coursePreferences.length > 1) {
      this.coursePreferences.removeAt(1);
    }
    this.submitted = false;
    this.success = false;
    this.errorMessage = '';
  }
}
