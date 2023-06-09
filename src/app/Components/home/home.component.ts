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
    { link: '/listP', color: 'card-green', iconClass: 'fa fa-users fa-3x', title: 'Personnels' },
    { link: '/list-registre-traitement', color: 'card-orange', iconClass: 'fa fa-lock fa-3x', title: 'RGPD' },
    { link: '/nc-add', color: 'card-red', iconClass: 'fa fa-exclamation-circle fa-3x', title: 'Ouvrir une NC' },
    { link: '/listdocument', color: 'card-brown', iconClass: 'fas fa-file-alt fa-3x', title: 'Documentation' },
    { link: '#', color: 'card-purple', iconClass: 'fas fa-chart-pie fa-3x', title: 'Vision 360' },
    { link: '#', color: 'card-black', iconClass: 'fa fa-cogs fa-3x', title: 'Paramètres' }
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
  const length = this.icons.length;
  const slidesToShow = 6;

  this.currentSlide += direction;

  if (this.currentSlide < 0) {
    this.currentSlide = length - slidesToShow;
  } else if (this.currentSlide > length - slidesToShow) {
    this.currentSlide = 0;
  }
}
}

