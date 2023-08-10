import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstatAuditService } from 'src/app/Services/Service-constatAudit/constat-audit.service';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ApiTachesService } from 'src/app/Services/Service-document-unique/api-taches.service';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Actions } from 'src/app/models/actions';
import { ConstatAudit } from 'src/app/models/constat-audit';
import { Nc } from 'src/app/models/nc';
import { Taches } from 'src/app/models/taches';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: number | null = null; // Initialize this with the appropriate value
  icons = [
    { link: '/listP', color: 'card-icon', imageSrc: 'assets/images/business-people.png', title: 'Personnels' },
    { link: '/list-registre-traitement', color: 'card-icon', imageSrc: 'assets/images/rgpd.png', title: 'RGPD' },
    { link: '/nc-add', color: 'card-icon', imageSrc: 'assets/images/liste-de-controle.png', title: 'Ouvrir une NC' },
    { link: '/listdocument', color: 'card-icon', imageSrc: 'assets/images/doc.png', title: 'Documentation' },
    { link: '/cartographie', color: 'card-icon', imageSrc: 'assets/images/reseau.png', title: 'Cartographie' },
    { link: '/equipement-list', color: 'card-icon', imageSrc: 'assets/images/parametre.png', title: 'Equipements' },
    { link: '/listC', color: 'card-icon', imageSrc: 'assets/images/diner.png', title: 'Commande repas' },
    { link: '/listMenu', color: 'card-icon', imageSrc: 'assets/images/restauration.png', title: 'Menus restaurants' },
    { link: '/listF', color: 'card-icon', imageSrc: 'assets/images/des-documents.png', title: 'Fiches Techniques' },
    { link: '/sante-list', color: 'card-icon', imageSrc: 'assets/images/health-and-care.png', title: 'Santé mentale' },
    { link: '/plan-alimentaire-list', color: 'card-icon', imageSrc: 'assets/images/regime.png', title: 'Plan Alimentaire' },


    { link: '/analyseSWOT', color: 'card-icon', imageSrc: 'assets/images/analyse.png', title: 'Analyse SWOT' },
    { link: '/danger', color: 'card-icon', imageSrc: 'assets/images/document-unique.png', title: 'Document Unique' },
    { link: '/listReunion', color: 'card-icon', imageSrc: 'assets/images/reunion.png', title: 'Suivie des Réunions' },
    { link: '/listsites', color: 'card-icon', imageSrc: 'assets/images/site.png', title: 'Sites' },
    { link: '/evenement-list', color: 'card-icon', imageSrc: 'assets/images/event.png', title: 'Registre des événements' },
  ];
  currentSlide = 0;

  ncs: Nc[] = [];
  actions: Actions[] = [];
  taches: Taches[] = [];
  constats: ConstatAudit[] = [];

  deleteModal: any;
  idTodelete: number = 0;


  constructor(private ncservice: ServicesNonConfirmitéService, private actionService: ApiActionsService, private tacheservice: ApiTachesService,private route :ActivatedRoute, private constatservice : ConstatAuditService) {
    

  }
  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] ? Number(params['userId']) : null;
      if (!this.userId) {
        const storedUserId = localStorage.getItem('loggedInUserId');
        this.userId = storedUserId ? Number(storedUserId) : null;
      }

      console.log("this.userId:", this.userId);

      if (!this.userId) {
        console.log("No userId available.");
      } else {
        this.getNcsByUser(this.userId);
        this.getActionsByUser(this.userId);
        this.getTachesByUser(this.userId);
        this.getConstatByUser(this.userId);

      }
    });
  }
  
  getNcsByUser(userId: number | null) {
    if (!userId) return;
  
    this.ncservice.getAll().subscribe(
      (res: Nc[]) => { 
        this.ncs = res.filter(nc => nc.responsable_traitement === userId);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  getActionsByUser(userId: number | null) {
    if (!userId) return;
  
    this.actionService.getAllActions().subscribe(
      (res: Actions[]) => {
        this.actions = res.filter(action => action.assigne_a === userId);
      },
      error => {
        console.log(error);
      }
    );
  }
  getTachesByUser(userId: number | null) {
    if (!userId) return;
  
    this.tacheservice.getAllTaches().subscribe(
      (res: Taches[]) => {
        this.taches = res.filter(tache => tache.assigne_a === userId);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  getConstatByUser(userId: number | null) {
    if (!userId) return;
  
    this.constatservice.getConstatAudits().subscribe(
      (res: ConstatAudit[]) => {
        this.constats = res.filter(constat => constat.responsable_traitement.includes(userId));
      },
      error => {
        console.log(error);
      }
    );
  }
  
  changeSlide(direction: number) {
    const totalCards = this.icons.length;
    const cardsPerPage = 8;

    const totalSlides = Math.ceil(totalCards / cardsPerPage);

    this.currentSlide += direction;

    if (this.currentSlide >= totalSlides) {
      this.currentSlide = 0;
    } else if (this.currentSlide < 0) {
      this.currentSlide = totalSlides - 1;
    }
  }

  getVisibleIcons(): any[] {
    const cardsPerPage = 8;
    const start = this.currentSlide * cardsPerPage;
    const end = start + cardsPerPage;

    return this.icons.slice(start, end);
  }






}

