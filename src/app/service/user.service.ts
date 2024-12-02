import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { User } from '../model/user';
import { UserRegistration } from '../model/userRegistration';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = "https://deliveryroutesbackend.up.railway.app";

  usuarioAtual: User = new User();

  constructor(private _http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseUrl}/users/all`);
  }

  register(user: UserRegistration): Observable<User> {
    return this._http.post<User>(`${this.baseUrl}/users/sign-up`, user).pipe(
      tap((response) => {
        if (response) {
          let newObject = JSON.parse(JSON.stringify(response));

          newObject.password = user.password;
          localStorage.setItem('currentUser', JSON.stringify(newObject));
        }
      })
    );
  }

  getUserByUsername(username: string): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/users/${username}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this._http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  toggleUserStatus(user: User): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/users/toggle-status`, user);
  }

  getCurrentUserProfile(): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/users/profile`);
  }

  // Alterar senha
  changePassword(
    id: number,
    passwords: { currentPassword: string; newPassword: string }
  ): Observable<void> {
    return this._http.put<void>(
      `${this.baseUrl}/users/${id}/change-password`,
      passwords
    );
  }

  // Verificar se email já existe
  checkEmailExists(email: string): Observable<boolean> {
    return this._http.get<boolean>(
      `${this.baseUrl}/users/check-email/${email}`
    );
  }

  // Buscar usuários com paginação e filtros
  getUsers(params: {
    page: number;
    size: number;
    sort?: string;
    role?: string;
    active?: boolean;
    search?: string;
  }): Observable<{
    content: User[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    return this._http.get<any>(
      `${this.baseUrl}/users/search?${queryParams.toString()}`
    );
  }
}
