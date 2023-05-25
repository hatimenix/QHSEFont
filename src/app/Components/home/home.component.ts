import { Component} from '@angular/core';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
import { Nc } from 'src/app/models/nc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
}

