import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as countriesData from '../../../../../assets/countries.json';
import { Country } from '../../models/country.interface';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public form: FormGroup;
  public checked: boolean = false;
  public idUsuario: number;
  public userToEdit!: User;

  public countries!: Country[];
  public selectedCountry: string = '';

  /** Subscriptions */
  public subscriptionGet: Subscription = new Subscription();
  public subscriptionEdit: Subscription = new Subscription();
  public subscriptionCreate: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private aRoute: ActivatedRoute,
  ) {

    this.idUsuario = Number(this.aRoute.snapshot.paramMap.get('id')!);

    if(this.idUsuario > 0) {
      // get user data
      this.subscriptionGet = this._userService.getUserById(this.idUsuario).subscribe(
        {
          next: (data) => {
            this.userToEdit = data;
          },
          error: err => console.log(err),
          complete: () => {
              this.form.setValue({
                name: this.userToEdit.nombre,
                lastName: this.userToEdit.apellido,
                email: this.userToEdit.email,
                birthDate: this.userToEdit.fechaNacimiento,
                phoneNumber: this.userToEdit.telefono ? this.userToEdit.telefono : '',
                country: this.userToEdit.paisResidencia,
                questionContact: this.userToEdit.preguntaSobreContacto ? true : false
            })
          }
        }
      )
    }

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
      birthDate: ['', [Validators.required]],
      phoneNumber: [''],
      country: ['', Validators.required],
      questionContact: ['']
    })

    this.getCountriesFromJson();
  }

  ngOnDestroy(): void {
    this.subscriptionGet.unsubscribe();
    this.subscriptionEdit.unsubscribe();
    this.subscriptionCreate.unsubscribe();
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
      preguntaSobreContacto: this.form.get('questionContact')?.value ? true : false,
      estado: 1
    };

    debugger;

    if(this.idUsuario > 0) {
      user.id = this.idUsuario,
      this.subscriptionEdit = this._userService.updateUser(this.idUsuario, user).subscribe(
        {
          next: () => {
            // this.toastr.success('', 'Usuario Editado');
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.log(error);
            // this.toastr.error('', 'Error al editar usuario')
          }
        }
      )
    } else {
      this.subscriptionCreate = this._userService.addUser(user).subscribe(
        {
          next: () => {
            // this.toastr.success('', 'Usuario Creado');
            this.router.navigateByUrl('/');
          },
          error: (error) => {
            console.log(error);
            // this.toastr.error('', 'Error al crear usuario');
          }
        }
      );
    }

  }

}
