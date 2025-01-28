import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string = environment.BASE_URL;
  /*public currentUserSubject = new BehaviorSubject<any>(null);
  currentUser = this.currentUserSubject.asObservable();*/

  constructor(private http: HttpClient) {}

  /**
   * Perform a GET request
   * @param endpoint The endpoint of the API (relative to baseUrl)
   * @param params Query parameters (optional)
   * @returns Observable of the HTTP response
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a POST request
   * @param endpoint The endpoint of the API (relative to baseUrl)
   * @param data The body of the request
   * @returns Observable of the HTTP response
   */
  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    const options = { headers: headers || new HttpHeaders() }; // Use provided headers or default to an empty HttpHeaders
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, data, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Perform a PUT request
   * @param endpoint The endpoint of the API (relative to baseUrl)
   * @param data The body of the request
   * @returns Observable of the HTTP response
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Perform a DELETE request
   * @param endpoint The endpoint of the API (relative to baseUrl)
   * @returns Observable of the HTTP response
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Common error handling for API requests
   * @param error The HTTP error response
   * @returns Observable with an error message
   */
  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';

    // Handle different error types (client-side or server-side)
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      // Optionally, you can add more logic here based on status codes
    }

    // Optionally, you can display error message using a toast, snackbar, or any other method

    // Return the error with the message
    return throwError(() => new Error(errorMessage));
  }

  // Optionally, you can save the token to localStorage or sessionStorage
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getItem(key: any): any {
    return localStorage.getItem(key);
  }

  storeUserData(key: string, val: string): void {
    localStorage.setItem(key, val);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }

}
