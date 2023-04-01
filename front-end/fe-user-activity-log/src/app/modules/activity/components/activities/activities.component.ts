import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../models/activity.interface';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  public loading: boolean = false;
  public idUsuario: number;

  /** Table Properties */
  public displayedColumns: string[] = [
    'id',
    'createDate',
    'actividad',
    'idUsuario'
  ];
  public dataSource!: MatTableDataSource<Activity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _activityService: ActivityService, private aRoute: ActivatedRoute) {
    this.idUsuario = Number(this.aRoute.snapshot.paramMap.get('id')!);
  }

  public ngOnInit(): void {
    this.loading = true;
    this.getActivities();
  }

  public async getActivities(): Promise<void> {
    await this._activityService.getActivities(this.idUsuario).subscribe(
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
