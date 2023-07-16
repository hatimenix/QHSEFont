import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MenusService } from 'src/app/Services/Service-Menus/menus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Menus } from 'src/app/models/Menus';
import { Site } from 'src/app/models/Site';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.css']
})
export class ListMenusComponent implements OnInit {
  menus!: Menus[];
  searchQuery: string = '';
  //filtrage
  selectedSiteId: number | undefined;
  site: any[] = [];
  site$!: Observable<any>;
  selectedSite: Site | undefined;
  myForm: any;

  filteredMenus: Menus[] = [];
  MoisSelectionne: string = '';
  selectedMonth = new FormControl('');

  //delete modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  menuIdToDelete: number = 0;
  filename: string = '';
  @ViewChild('siteModal', { static: true }) siteModal: any;


  constructor(private menuService: MenusService, public modalService: BsModalService,
    private siteService: ApiSiteService,) { }


  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);
    this.myForm = new FormGroup({
      site: new FormControl(),
      mois_concerne: new FormControl()
    });
    this.siteService.getAllSite().subscribe(
      (data: any[]) => {
        this.site = data;
        console.log(this.site); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
    this.getMenus();
    //pagination 
    this.itemsPerPageOptions = [5, 10, 15];
    this.itemsPerPage = this.itemsPerPageOptions[0];
    
    this.selectedMonth.valueChanges.subscribe(() => {
      this.filterMenusByMonth();
    });
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
  // filterMenuByMonth(): void {
  //   if (this.MoisSelectionne) {
  //     console.log("mois séléctionné", this.MoisSelectionne);
      
  //     this.menuService.getAllMenus().subscribe((menus) => {
  //       this.menus = menus.filter((m) => m.mois_concerne === this.MoisSelectionne);
  //     });
  //   } else {
  //     this.getMenus();

  //   }
  // }
//  filterMenuByMonth(MoisSelectionne: string): void {
//   this.menuService.getAllMenus().subscribe(
//     (data: Menus[]) => {
//       const filteredMenus = data.filter((menus: Menus) => {
//         return menus.mois_concerne === MoisSelectionne;
//       });

//       if (filteredMenus.length > 0) {
//         this.menus = filteredMenus;
//       } else {
//         console.log(`No menu found for this month: ${MoisSelectionne}`);
//         this.menus = [];
//       }

//       console.log("Filtered menus:", this.menus);

//       filteredMenus.forEach(m => {
//         const s = this.site.find((s: Site) => s.id === m.site);
//         if (s) {
//           s.expanded = true;
//         }
//       });
//     },
//     (error: any) => {
//       console.log(error);
//     }
//   );
// }

  resetMenuFilters(): void {
   
    this.MoisSelectionne = ''; 
    this.myForm.reset(); 
    this.getMenus(); 
  }


  filterMenusByMonth() {
    const selectedMonth = this.selectedMonth.value;
    if (!selectedMonth) {
      this.filteredMenus = this.menus; // Show all menus when no month is selected
    } else {
      this.filteredMenus = this.menus.filter((menu) => menu.mois_concerne === selectedMonth);
    }
  }

  get displayedMenus(): any[] {
    const startIndex = (this.p - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMenus.slice(startIndex, endIndex);
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
  //site modal 
  openSiteModal(site: Site) {
    this.selectedSite = site;
    this.modalRef = this.modalService.show(this.siteModal);
  }
  closeModalsite() {
    this.modalService.hide();
  }
  resetSearchQuery() {
    this.searchQuery = '';
  }

  //pagination methods 
  itemsPerPageOptions: number[] = [5, 10, 15];
  itemsPerPage: number = this.itemsPerPageOptions[0];
  p: number = 1;
  get totalPages(): number {
    return Math.ceil(this.menus.length / this.itemsPerPage);
  }

  // get displayedMenus(): any[] {
  //   const startIndex = (this.p - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.menus.slice(startIndex, endIndex);
  // }


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
    const endIndex = Math.min(this.p * this.itemsPerPage, this.menus.length);
    return `Affichage de ${startIndex} à ${endIndex} de ${this.menus.length} entrées`;
  }
}
