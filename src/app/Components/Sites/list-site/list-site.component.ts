import { Component, OnInit } from '@angular/core';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit{
  site: Site[] = [];
  personnelService: any;

constructor(private siteService: ApiSiteService) { }
ngOnInit(): void {
this.loadsite();
}
loadsite() {
this.siteService.getAllSite().subscribe(
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
