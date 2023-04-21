import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
    //modal
    @ViewChild('deleteModal', { static: true }) deleteModal!: any;
    modalRef!: BsModalRef;
    siteIdToDelete: number = 0;

constructor(private siteService: ApiSiteService, public modalService: BsModalService) { }
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
 //delete modal
 confirmDelete(): void {
  this.siteService.deleteSite(this.siteIdToDelete)
    .subscribe(() => {
      this.site = this.site.filter(s => s.id !== this.siteIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }
}
