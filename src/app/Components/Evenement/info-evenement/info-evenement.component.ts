import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiAnalyseEvenementService } from 'src/app/Services/Service-document-unique/api-analyse-evenement.service';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiEvenementService } from 'src/app/Services/Service-document-unique/api-evenement.service';
import { ApiServiceService } from 'src/app/Services/Service-document-unique/api-service.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Actions } from 'src/app/models/actions';
import { Evenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-info-evenement',
  templateUrl: './info-evenement.component.html',
  styleUrls: ['./info-evenement.component.css']
})
export class InfoEvenementComponent {

  evenement: Evenement | undefined;
  site: any;
  service : any;
  analyse: any;
  actions: Actions[] = [];

  constructor(
    private apiEvenementService: ApiEvenementService,
    private route: ActivatedRoute,
    private apiAnalyseEvenementService: ApiAnalyseEvenementService,
    private apiActionsService: ApiActionsService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const evenementId = Number(params.get('id'));

      this.apiEvenementService.getEvenement(evenementId).subscribe(
        evenement => {
          this.evenement = evenement;
          
          // Récupérer toutes les actions liées à l'événement
          this.apiActionsService.getAllActions().subscribe(
            actions => {
              // Filtrer les actions pour ne garder que celles liées à l'événement
              this.actions = actions.filter(action => action.evenement.includes(evenementId));
              console.log(this.actions);
            },
            error => {
              console.error(error);
            }
          );

          this.apiAnalyseEvenementService.getAnalyseEvenement(evenementId).subscribe(
            analyse => {
              this.analyse = analyse;
            },
            error => {
              console.error(error);
            }
          );
        },
        error => {
          console.error(error);
        }
      );
    });
    };
}
