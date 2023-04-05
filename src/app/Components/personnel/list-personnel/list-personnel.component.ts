import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Personnel } from 'src/app/models/Personnel';

@Component({
  selector: 'app-list-personnel',
  templateUrl: './list-personnel.component.html',
  styleUrls: ['./list-personnel.component.css']
})
export class ListPersonnelComponent implements OnInit{
  personnels!: Personnel[];

  constructor(private personnelService: PersonnelService) {}

  ngOnInit(): void {
    this.loadPersonnels();
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnel().subscribe((personnels: Personnel[]) => {
      this.personnels = this.personnels;
    });
  }

  deletePersonnel(id: number): void {
    this.personnelService.deletePersonnel(id).subscribe(() => {
      this.loadPersonnels();
    });
  }

}
