import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceRegistreTraitementService } from 'src/app/Services/Service-registre-traitement/service-registre-traitement.service';
@Component({
  selector: 'app-info-rgpd',
  templateUrl: './info-rgpd.component.html',
  styleUrls: ['./info-rgpd.component.css']
})
export class InfoRGPDComponent implements OnInit{
  traitementId: number | undefined;
  currentTraitement: any;

  constructor(
    private route: ActivatedRoute,
    private traitementservice : ServiceRegistreTraitementService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.traitementId = +id;
        this.traitementservice.get(this.traitementId).subscribe(traitement => {
          this.currentTraitement = traitement;
        });
      }
    });
  }


}
