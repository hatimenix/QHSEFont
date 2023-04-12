import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesNonConfirmitéService } from 'src/app/Services/Services-non-confirmité/services-non-confirmité.service';
@Component({
  selector: 'app-info-nc',
  templateUrl: './info-nc.component.html',
  styleUrls: ['./info-nc.component.css']
})
export class InfoNcComponent implements OnInit {
  ncId: number | undefined;
  currentNc: any;

  constructor(
    private route: ActivatedRoute,
    private ncservice : ServicesNonConfirmitéService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ncId = +id;
        this.ncservice.get(this.ncId).subscribe(nc => {
          this.currentNc = nc;
        });
      }
    });
  }
}
