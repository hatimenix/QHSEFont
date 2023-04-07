import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/Services/Service-Site/site.service';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit{
  site: Site[] = [];
  personnelService: any;

constructor(private siteService: SiteService) { }
ngOnInit(): void {
this.loadsite();
}
loadsite() {
this.siteService.getSite().subscribe(
(data: Site[]) => {
this.site = data;
}
)
}
deleteSite(id: number) :void{
  this.siteService.deleteSite(id).subscribe(() => {
    this.site = this.site.filter((p) => p.id !== id);
  });
}
}
