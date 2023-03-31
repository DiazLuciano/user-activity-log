import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countriesData from '../../../../../assets/countries.json';
import { Country } from '../../models/country.interface';

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
    private fb: FormBuilder
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
    const user: any = {
      nombre: this.form.get('name')?.value,
      apellido: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      fechaNacimiento: this.form.get('birthDate')?.value,
      telefono: this.form.get('phoneNumber')?.value,
      paisResidencia: this.form.get('country')?.value,
      preguntaContacto: this.form.get('questionContact')?.value ? true : false,
    };
    console.log(user);
  }

}
