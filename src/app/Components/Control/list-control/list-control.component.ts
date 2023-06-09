import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ControlService } from 'src/app/Services/Service-control/control.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Control } from 'src/app/models/Control';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.css']
})
export class ListControlComponent {
  control!: Control[];
  //filtrage
  selectedSiteId: number | undefined;
  site!: Site[];
  site$!: Observable<any>;
  myForm: any;

  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  controldToDelete: number = 0;
  filename: string = '';

  constructor(private controlService: ControlService, public modalService: BsModalService,
    private siteService: ApiSiteService,) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      site: new FormControl(),
      
    });
    this.getControl();
    this.site$ = this.siteService.getAllSite();

    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
  }

  getControl(): void {
    this.controlService.getAllControls().subscribe((control) => {
      this.control = control;
      
    });
  }

  deleteControl(id: number): void {
    this.controlService.deleteControl(id).subscribe(() => {
      this.control = this.control.filter((c) => c.id !== id);
    });
  }


 
  //delete modal 
confirmDelete(): void {
  this.controlService.deleteControl(this.controldToDelete)
    .subscribe(() => {
      this.control = this.control.filter(c => c.id !== this.controldToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }

 //filtrage par site
filterControlsBySite(): void {
  const selectedSite = parseInt(this.myForm.get('site')?.value);

  if (selectedSite) {

    this.controlService.getAllControls().subscribe(
      (data: Control[]) => {
        const control = data;
        const filteredControls = control.filter(c => {
          const siteIds = Array.isArray(c.site) ? c.site.map((s: Site) => s.id) : [c.site];
          return siteIds.includes(selectedSite);
        });

        if (filteredControls.length > 0) {
          this.selectedSiteId = selectedSite;
          this.control = filteredControls;
        } else {
          console.log(`Aucun control trouvé pour le site sélectionné: ${selectedSite}`);
          this.control = [];
        }

        console.log("controls filtrés", this.control);
        console.log("site sélectionné", this.selectedSiteId);
        console.log("liste des controls", this.control);
        console.log("control length", this.control.length);

      },
      (error: any) => {
        console.log(error);
      }
    );

  } else {
    this.myForm.reset();
    this.selectedSiteId = undefined;
    console.log("id de ce site", this.selectedSiteId);
    this.getControl();
  }
}




}
