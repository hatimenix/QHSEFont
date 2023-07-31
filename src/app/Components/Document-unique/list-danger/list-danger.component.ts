import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ApiDangerService } from 'src/app/Services/Service-document-unique/api-danger.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Dangers } from 'src/app/models/dangers';

declare var window:any;

@Component({
  selector: 'app-list-danger',
  templateUrl: './list-danger.component.html',
  styleUrls: ['./list-danger.component.css']
})
export class ListDangerComponent {

  dangers: any;
  deletModal : any;
  idToDelete: number = 0;
  sites$ !: Observable<any>;
  myForm: any;
  selectedSiteId: number | undefined;
  sites: any[] = [];

  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;

  //search
  searchQuery: string = '';

  constructor(private apiDangerService: ApiDangerService,
    private apiSiteService: ApiSiteService,
    public modalService: BsModalService) { }

  ngOnInit() {
    this.fetchDanger();

    this.myForm = new FormGroup({
      site: new FormControl(''),
    });

    this.sites$ = this.apiSiteService.getAllSite();

    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );

  }

  fetchDanger() {
    this.apiDangerService.getAllDanger().subscribe((data) => {
      this.dangers = data;
    })
  }

  filterDangersBySite(): void {
    const selectedSite = parseInt(this.myForm.get('site')?.value);
  
    if (selectedSite) {
      this.apiDangerService.getAllDanger().subscribe(
        (data: Dangers[]) => {
          const dangers = data;
          const filteredDangers = dangers.filter(danger => danger.site === selectedSite);
  
          if (filteredDangers.length > 0) {
            this.selectedSiteId = selectedSite;
            this.dangers = filteredDangers;
          } else {
            console.log(`Aucun danger trouvé pour le site sélectionné: ${selectedSite}`);
            this.dangers = [];
          }
  
          console.log("Dangers filtrés", this.dangers);
          console.log("Site sélectionné", this.selectedSiteId);
        },
        (error: any) => {
          console.log(error);
        }
      );
  
      this.sites.forEach((site) => {
        site.expanded = site.id === selectedSite;
      });
  
    } else {
      this.myForm.reset();
      this.selectedSiteId = undefined;
      console.log("ID du site", this.selectedSiteId);
      this.fetchDanger();
      this.sites.forEach((site) => {
        site.expanded = true;
      });
    }
  }
  

  resetSiteFilters(): void {
    // Reset the selected filters and reload the data
    this.myForm.reset(); // Reset the form and selected site filter
    this.fetchDanger(); // Reload the data
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
  }

  resetSearchQuery() {
    this.searchQuery = '';
  }

  //pagination methods 
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.dangers.length / this.itemsPerPage);
  }

  get displayedDangers(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dangers.slice(startIndex, endIndex);
  }


  onItemsPerPageChange(option: number) {
    this.p = 1; 
    this.itemsPerPage = option; 
  }
  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  getDisplayedRange(): string {
    const startIndex = (this.p - 1) * this.itemsPerPage + 1;
    const endIndex = Math.min(this.p * this.itemsPerPage, this.dangers.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.dangers.length} entrées`;
  }

  //delete modal 
  deleteDanger(): void {
    this.apiDangerService.delDanger(this.idToDelete)
      .subscribe(() => {
        this.fetchDanger();
        this.modalRef.hide();
    });
  }
  
  declineDelete(): void {
    this.modalRef.hide();
  }

}