import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.API_URL + "User";

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
