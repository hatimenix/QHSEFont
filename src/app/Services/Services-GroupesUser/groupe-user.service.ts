import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupeUser } from 'src/app/models/GroupeUser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GroupeUserService {

  private API_GroupeUsers =environment.API_GroupeUsers;
  constructor(private http: HttpClient) { }

  getGroupes(): Observable<GroupeUser[]> {
    return this.http.get<GroupeUser[]>(this.API_GroupeUsers);
  }

  getGroupeUserById(id: number): Observable<GroupeUser> {
    const url = `${this.API_GroupeUsers}${id}`;
    return this.http.get<GroupeUser>(url);
  }

  createGroupeUser(groupeUser: GroupeUser): Observable<GroupeUser> {
    return this.http.post<GroupeUser>(this.API_GroupeUsers, groupeUser);
  }

  updateGroupeUser(id: number, groupeUser: GroupeUser): Observable<GroupeUser> {
    const url = `${this.API_GroupeUsers}${id}/`;
    return this.http.put<GroupeUser>(url, groupeUser);
  }

  deleteGroupeUser(id: number): Observable<void> {
    const url = `${this.API_GroupeUsers}${id}`;
    return this.http.delete<void>(url);
  }
  //get the group permissions 
  getGroupPermissions(groupId: number): Observable<string[]> {
    const url = `${this.API_GroupeUsers}${groupId}`; // Update the URL based on your API endpoint
  
    return this.http.get<string[]>(url);
  }
  
}
