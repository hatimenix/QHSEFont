import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenusService } from 'src/app/Services/Service-Menus/menus.service';
import { Menus } from 'src/app/models/Menus';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.css']
})
export class ListMenusComponent implements OnInit{
  menus!: Menus[];
  //filtrage
  typePlatSelectionne!: string;

  myForm: any;
  
  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  menuIdToDelete: number = 0;

  constructor(private menuService: MenusService, public modalService: BsModalService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      type_plat: new FormControl()
    });
    this.getMenus();

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

  downloadMenu(id: number): void {
    this.menuService.downloadMenu(id).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = response.fichier.split('/').pop();
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
//fonction de filtrage par type de plat
 
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

}
