import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../NgServices/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() 
model: any = {};
registerForm: FormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      gender: ['male'],
      nickname: ['', Validators.required],
      birthday: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.PasswordMatch('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity(); 
      //when the password changes then the validity will be updated to be sure that there is validation even when there is a change in the fields 
    }
    )
  }

  PasswordMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {Matching: true} 
    }
  }

  register() {
    console.log(this.registerForm.value);
  //  this.accountService.register(this.model).subscribe(response => {
  //    console.log(response);
  //     },
  //  error =>{
  //     console.log(error);
  //     this.toastr.error(error.error);
  //  })
   }

}
