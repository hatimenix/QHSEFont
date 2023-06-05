import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exigences } from 'src/app/models/exigences';
import { ExigencesService } from 'src/app/Services/Service-exigences/exigences.service';

@Component({
  selector: 'app-info-exigences',
  templateUrl: './info-exigences.component.html',
  styleUrls: ['./info-exigences.component.css']
})
export class InfoExigencesComponent {
  exigenceId !: number;
  exigence!: Exigences;
  constructor(
    private route: ActivatedRoute,
    private exigenceservice:ExigencesService
  ) {}
  ngOnInit() {
  this.exigenceId = +this.route.snapshot.params['id'];
    this.exigenceservice.getExigences(this.exigenceId).subscribe(
      (data: Exigences) => {
        this.exigence = data;
      },
      error => console.log(error)
    );
    }
}
