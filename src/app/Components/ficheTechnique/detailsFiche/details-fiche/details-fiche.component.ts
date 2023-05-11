import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';
import { FicheTechnique } from 'src/app/models/FicheTechnique';

@Component({
  selector: 'app-details-fiche',
  templateUrl: './details-fiche.component.html',
  styleUrls: ['./details-fiche.component.css']
})
export class DetailsFicheComponent implements OnInit{
  id!: number;
  currentId:any
  constructor(private ficheService: FicheserService, 
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.ficheService.getFicheById(this.id).subscribe(fiche => {
          this.currentId = fiche;
        });
      }
    });
   
  }
}
