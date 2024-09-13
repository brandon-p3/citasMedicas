import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:3010/api/mail/send-mail'; // Change if needed

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text?: string, html?: string): Observable<any> {
    const emailData = { to, subject, text, html };
    return this.http.post<any>(this.apiUrl, emailData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
