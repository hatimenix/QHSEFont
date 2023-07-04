import { Component } from '@angular/core';
import { ApiActionsService } from 'src/app/Services/Service-document-unique/api-actions.service';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Actions } from 'src/app/models/actions';
import { Nc } from 'src/app/models/nc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  icons = [
    { link: '/listP', color: 'card-icon', imageSrc: 'assets/images/business-people.png', title: 'Personnels' },
    { link: '/list-registre-traitement', color: 'card-icon', imageSrc: 'assets/images/rgpd.png', title: 'RGPD' },
    { link: '/nc-add', color: 'card-icon', imageSrc: 'assets/images/liste-de-controle.png', title: 'Ouvrir une NC' },
    { link: '/listdocument', color: 'card-icon', imageSrc: 'assets/images/doc.png', title: 'Documentation' },
    { link: '/cartographie', color: 'card-icon',imageSrc: 'assets/images/reseau.png', title: 'Cartographie' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/parametre.png', title: 'Equipements' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/diner.png', title: 'Commande repas' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/restauration.png', title: 'Menus restaurants' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/des-documents.png', title: 'Fiches Techniques' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/health-and-care.png', title: 'Santé mentale' },
    { link: '#', color: 'card-icon', imageSrc: 'assets/images/regime.png', title: 'Plan Alimentaire' },
  ];
  currentSlide = 0;

  ncs: Nc[] = [];
  actions : Actions[]=[];

  deleteModal: any;
  idTodelete: number = 0;


  constructor(private ncservice: ServicesNonConfirmitéService,private actionService : ApiActionsService) {

  }
  ngOnInit(): void {
    this.getNcs();

  }

  getNcs() {
    this.ncservice.getAll().subscribe(
      res => {
        this.ncs = res;
      },
      error => {
        console.log(error);
      }
    );
  }

getActions(){
  this.actionService.getAllActions().subscribe(
    res => {
      this.actions = res;
    },
    (    error: any) => {
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

