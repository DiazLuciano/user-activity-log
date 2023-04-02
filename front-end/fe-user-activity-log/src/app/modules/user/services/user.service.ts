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

  public getUserById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + "/" + id);
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<User>(this.apiUrl, user);
  }

  public updateUser(id: number, user: User): Observable<any> {
    return this.http.put<User>(this.apiUrl + "/" + id, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(this.apiUrl + "/" + id);
  }
}
