import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public loading: boolean = false;
  public users!: User[];

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
    'acciones'
  ];
  public dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserService) {
  }

  public ngOnInit(): void {
    this.loading = true;
    this.getUsers();
  }

  public async getUsers(): Promise<void> {
    await this._userService.getUsers().subscribe(
      {
        next: (data) => {
          console.log(data)
          this.dataSource = new MatTableDataSource(data);
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

}
