import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponse } from '../model/jwtResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<JwtResponse | null>(null);

  baseUrl = "https://deliveryroutesbackend.up.railway.app";

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      this.currentUserSubject.next({token: storedUser});
    }
  }

  get currentUser(): JwtResponse | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser?.token;
  }

  get authToken(): string | null {
    return this.currentUser?.token ?? null;
  }

  login(username: string, password: string): Observable<JwtResponse> {
    const body = { username, password };

    return this.http
      .post<JwtResponse>(`${this.baseUrl}/authenticate`, body)
      .pipe(
        tap((response) => {
          if (!response || !response.token) {
            throw new Error('Resposta inválida do servidor');
          }

          //localStorage.setItem('currentUser', JSON.stringify(response));
          localStorage.setItem('token', JSON.stringify(response.token));
          this.currentUserSubject.next(response);
        }),
        catchError((error) => {
          if (error.status === 401) {
            console.error('Credenciais inválidas:', error);
            throw new Error('Usuário ou senha incorretos.');
          } else if (error.status === 0) {
            console.error('Erro de conexão:', error);
            throw new Error(
              'Não foi possível conectar ao servidor. Verifique sua conexão.'
            );
          } else if (error instanceof Error) {
            console.error('Erro na resposta do servidor:', error.message);
            throw new Error(`Erro inesperado: ${error.message}`);
          } else {
            console.error('Erro desconhecido:', error);
            throw new Error('Ocorreu um erro inesperado. Tente novamente mais tarde.');
          }
          //return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/sign-in']);
  }

  hasRole(role: string): boolean {
    const token = this.authToken;
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const roles = decoded.roles || [];
      return roles.includes(role);
    } catch (e) {
      console.error('Erro ao decodificar o token', e);
      return false;
    }
  }

  isTokenExpired(): boolean {
    const token = this.authToken;
    return this.verifyIsTokenExpired(token || "");
  }

  verifyIsTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      //const decoded: any = jwtDecode(token);
      const decoded: any = JSON.parse(token.split(".")[0]);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private addAuthorizationHeader(): HttpHeaders {
    const token = this.authToken;
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  getUserProfile(): Observable<any> {
    const headers = this.addAuthorizationHeader();
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }
}

