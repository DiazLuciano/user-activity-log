import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  public loading: boolean = false;
  public users!: User[];
  public subscription: Subscription = new Subscription();

  /** Table Properties */
  public displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'email',
    'fechaNacimiento',
    'telefono',
    'paisResidencia',
    'preguntaContacto',
    'estado',
    'acciones'
  ];
  public dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService, private router: Router) {
  }
  ngAfterViewInit(): void {
    if(this.dataSource.data.length > 0)
    {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  public async getUsers(): Promise<void> {
    this.subscription = await this._userService.getUsers().subscribe(
      {
        next: (data) => {
          this.dataSource = new MatTableDataSource(data);
          console.log(this.dataSource.data.length);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => console.log(err),
        complete: () => this.loading = false
      }
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(id: number): void {
    this.loading = true;
    this._userService.deleteUser(id).subscribe(
      {
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
          this.ngOnInit();
        }
      }
    );
  }

}
