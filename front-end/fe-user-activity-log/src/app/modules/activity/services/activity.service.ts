import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl: string = environment.API_URL + "Activity";

  constructor(private http: HttpClient) { }

  public getActivities(idUsuario: number): Observable<any> {
    return this.http.get(this.apiUrl + "/" + idUsuario);
  }

  public addActivity(activity: Activity): Observable<any> {
    return this.http.post<Activity>(this.apiUrl, activity);
  }
}
