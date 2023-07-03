import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxesStrategiquesService } from 'src/app/Services/Service-AxesStratégiques/axes-strategiques.service';
import { AxesStrategiques } from 'src/app/models/axes-strategiques';
@Component({
  selector: 'app-info-axes',
  templateUrl: './info-axes.component.html',
  styleUrls: ['./info-axes.component.css']
})
export class InfoAxesComponent {
  axeId !: number;
  axe!: AxesStrategiques;
  constructor(
    private route: ActivatedRoute,
    private axeservice:AxesStrategiquesService
  ) {}
  ngOnInit() {
  this.axeId = +this.route.snapshot.params['id'];
    this.axeservice.get(this.axeId).subscribe(
      (data: AxesStrategiques) => {
        this.axe = data;
      },
      error => console.log(error)
    );
    }

}
