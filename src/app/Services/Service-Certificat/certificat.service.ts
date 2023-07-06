import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CertificatCalibration } from 'src/app/models/CertificatCalibration';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {

  private API_certificat_calibration =environment.API_certificat_calibration;
  constructor(private http: HttpClient) { }

   
  getCertificats(): Observable<CertificatCalibration[]> {
    return this.http.get<CertificatCalibration[]>(this.API_certificat_calibration);
  }

  getCertificatById(id: number): Observable<CertificatCalibration> {
    return this.http.get<CertificatCalibration>(`${this.API_certificat_calibration}${id}`);
  }

  addCertificatFormData(formData: FormData): Observable<CertificatCalibration> {
    return this.http.post<CertificatCalibration>(this.API_certificat_calibration, formData);
  }
  updateCertificatFormdata(id: number, formData: FormData): Observable<any> {
    const url = `${this.API_certificat_calibration}${id}/`;
    return this.http.put(url, formData);
  }

  deleteCertificat(id: number): Observable<void> {
  if (!id || isNaN(id)) {
    return throwError('Invalid ID provided.');
  }
  const url = `${this.API_certificat_calibration}${id}/`;
  return this.http.delete<void>(url);
}
}
