import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MenusService } from 'src/app/Services/Service-Menus/menus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Menus } from 'src/app/models/Menus';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.css']
})
export class ListMenusComponent implements OnInit{
  menus!: Menus[];
  //filtrage
  selectedSiteId: number | undefined;
  site!: Site[];
  site$!: Observable<any>;
  myForm: any;
  filteredMenus: Menus[] = [];
  MoisSelectionne!: string;
  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  menuIdToDelete: number = 0;
  filename: string = '';

  constructor(private menuService: MenusService, public modalService: BsModalService,
    private siteService: ApiSiteService,) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      site: new FormControl(),
      mois_concerne:new FormControl()
    });
    this.getMenus();
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

  getMenus(): void {
    this.menuService.getAllMenus().subscribe((menus) => {
      this.menus = menus;
      
    });
  }

  deleteMenu(id: number): void {
    this.menuService.deleteMenu(id).subscribe(() => {
      this.menus = this.menus.filter((m) => m.id !== id);
    });
  }


 
  //delete modal 
confirmDelete(): void {
  this.menuService.deleteMenu(this.menuIdToDelete)
    .subscribe(() => {
      this.menus = this.menus.filter(f => f.id !== this.menuIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }

 //filtrage par site
filterMenusBySite(): void {
  const selectedSite = parseInt(this.myForm.get('site')?.value);

  if (selectedSite) {

    this.menuService.getAllMenus().subscribe(
      (data: Menus[]) => {
        const menu = data;
        const filteredMenus = menu.filter(d => {
          const siteIds = Array.isArray(d.site) ? d.site.map((s: Site) => s.id) : [d.site];
          return siteIds.includes(selectedSite);
        });

        if (filteredMenus.length > 0) {
          this.selectedSiteId = selectedSite;
          this.menus = filteredMenus;
        } else {
          console.log(`Aucun menu trouvé pour le site sélectionné: ${selectedSite}`);
          this.menus = [];
        }

        console.log("menus filtrés", this.menus);
        console.log("site sélectionné", this.selectedSiteId);
        console.log("liste des menus", this.menus);
        console.log("menus length", this.menus.length);

      },
      (error: any) => {
        console.log(error);
      }
    );

  } else {
    this.myForm.reset();
    this.selectedSiteId = undefined;
    console.log("id de ce site", this.selectedSiteId);
    this.getMenus();
  }
}
//filtrage par mois
filterMenuByMonth(): void {
  if (this.MoisSelectionne) {
    this.menuService.getAllMenus().subscribe((menus) => {
      this.menus = menus.filter((m) => m.mois_concerne === this.MoisSelectionne);
    });
  } else {
    this.getMenus();
  
}
}
//afficher juste le nom du fichier 
getFileNameFromPath(filePath: string | File | undefined): string {
  if (!filePath) return 'Aucun fichier joint';
  
  if (typeof filePath === 'string') {
    const parts = filePath.split('/');
    return parts.pop() || 'Aucun fichier joint';
  }
  
  return filePath.name || 'Aucun fichier joint';
}


}
