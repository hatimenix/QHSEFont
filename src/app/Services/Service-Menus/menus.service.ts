import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menus } from 'src/app/models/Menus';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private API_menus =environment.API_menus;

  constructor(private http: HttpClient) { }
  
  getAllMenus(): Observable<Menus[]> {
    return this.http.get<Menus[]>(this.API_menus);
  }

  getMenuById(id: number): Observable<Menus> {
    return this.http.get<Menus>(`${this.API_menus}${id}/`);
  }
  
  addMenuFormData(formData: FormData): Observable<Menus> {
    return this.http.post<Menus>(this.API_menus, formData);
  }
  
  updateMenuFormdata(formData: FormData): Observable<any> {
    const id = formData.get('id');
    const url = `${this.API_menus}${id}/`;
    return this.http.put(url, formData);
  }

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_menus}${id}/`);
  }

  
}
