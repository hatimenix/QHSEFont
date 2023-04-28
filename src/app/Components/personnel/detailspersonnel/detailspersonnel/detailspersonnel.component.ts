import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';

@Component({
  selector: 'app-detailspersonnel',
  templateUrl: './detailspersonnel.component.html',
  styleUrls: ['./detailspersonnel.component.css']
})
export class DetailspersonnelComponent implements OnInit {
  id!: number;
  currentId:any
  constructor(private personnelService: PersonnelService, 
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.personnelService.getPersonnelById(this.id).subscribe(personnel => {
          this.currentId = personnel;
        });
      }
    });
   
  }
}
