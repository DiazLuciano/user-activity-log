import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as countriesData from '../../../../../assets/countries.json';
import { Country } from '../../models/country.interface';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public loading: boolean = false;
  public form: FormGroup;
  public checked: boolean = false;

  public countries!: Country[];
  public selectedCountry: string = '';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.getCountriesFromJson();

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      birthDate: ['', [Validators.required]],
      phoneNumber: [''],
      country: ['', Validators.required],
      questionContact: ['']
    })
  }

  ngOnInit(): void {
  }

  public getCountriesFromJson(): void {
    this.countries = Object.values(countriesData);
  }

  public register(): void {
    const user: User = {
      id: 0,
      nombre: this.form.get('name')?.value,
      apellido: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      fechaNacimiento: this.form.get('birthDate')?.value,
      telefono: this.form.get('phoneNumber')?.value,
      paisResidencia: this.form.get('country')?.value,
      preguntaContacto: this.form.get('questionContact')?.value ? true : false,
      estado: 1
    };

    this._userService.addUser(user).subscribe(
      {
        next: (data) => {
          console.log(data);

          // this.activityService.addActivity();
          this.router.navigateByUrl('/');
        },
        error: (error) => console.log(error)
      }
    );
  }

}
