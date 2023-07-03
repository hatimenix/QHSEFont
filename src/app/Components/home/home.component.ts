import { Component} from '@angular/core';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
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
    
  ];
  currentSlide = 0;

  ncs : Nc[] = []

  deleteModal: any;
  idTodelete: number = 0;
  

  constructor(private   ncservice : ServicesNonConfirmitéService){

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
changeSlide(direction: number) {
  const totalCards = this.icons.length;
  const cardsPerPage = 8; // Number of cards to display per page

  // Calculate the total number of slides
  const totalSlides = Math.ceil(totalCards / cardsPerPage);

  // Calculate the new currentSlide based on the direction
  this.currentSlide += direction;

  // Wrap around to the first or last slide if necessary
  if (this.currentSlide >= totalSlides) {
    this.currentSlide = 0;
  } else if (this.currentSlide < 0) {
    this.currentSlide = totalSlides - 1;
  }
}

getVisibleIcons(): any[] {
  const cardsPerPage = 8; // Number of cards to display per page
  const start = this.currentSlide * cardsPerPage;
  const end = start + cardsPerPage;

  return this.icons.slice(start, end);
}






}

