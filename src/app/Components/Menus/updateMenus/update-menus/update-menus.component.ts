import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MenusService } from 'src/app/Services/Service-Menus/menus.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Menus } from 'src/app/models/Menus';

@Component({
  selector: 'app-update-menus',
  templateUrl: './update-menus.component.html',
  styleUrls: ['./update-menus.component.css']
})
export class UpdateMenusComponent implements OnInit{
  MenuForm!: FormGroup;
  menu!: Menus;
  id!: number;
  site$ !: Observable<any>;
  selectedFile!: File;
  fileToUpload: File | null = null;
  selectedFileName: string | null = null;
  //modal
  @ViewChild('successModal', { static: true }) successModal:any;
  modalRef!: BsModalRef;
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
    private router: Router, 
    private menuService: MenusService,
     private bsModalService: BsModalService,
     private siteService : ApiSiteService) { 
    this.MenuForm = new FormGroup({
      site: new FormControl(),
      mois_concerne: new FormControl(),
      menus_generaux: new FormControl(),
      menus_dessert: new FormControl(),
      menu_s1: new FormControl(),
      menu_s2: new FormControl(),
      menu_s3: new FormControl(),
      menu_s4: new FormControl(),
      menu_s5: new FormControl(),
    });
  }
  
  ngOnInit() {
    const isFirstVisit = history.state.isFirstVisit;

    if (!isFirstVisit) {
      // définir l'indicateur de visite dans l'historique de navigation
      history.replaceState({ isFirstVisit: true }, '');

      // rafraîchir la page
      location.reload();
    }

    // aller en haut de la page
    window.scrollTo(0, 0);
    this.site$ = this.siteService.getAllSite();
    //code
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.id = +id;
      this.menuService.getMenuById(this.id).subscribe(
        (data: Menus) => {
          this.menu = data;
          this.MenuForm = this.formBuilder.group({
            site: [this.menu.site, Validators.required],
            mois_concerne: [this.menu.mois_concerne, Validators.required],
            menus_generaux: [this.menu.menus_generaux, Validators.required],
            menus_dessert: [this.menu.menus_dessert],
            menu_s1: [this.menu.menu_s1],
            menu_s2: [this.menu.menu_s2],
            menu_s3: [this.menu.menu_s3],
            menu_s4: [this.menu.menu_s4],
            menu_s5: [this.menu.menu_s5]
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      console.log("ID de fiche introuvable dans l'URL");
      this.MenuForm = this.formBuilder.group({
        site: ['', Validators.required],
        mois_concerne: ['', Validators.required],
        menus_generaux: [''],
        menus_dessert: [''],
        menu_s1: [''],
        menu_s2: [''],
        menu_s3: [''],
        menu_s4: [''],
        menu_s5: [''],
        
      });
    }
  }
  
  onSubmit() {
    console.log(this.MenuForm.value);
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('site', this.MenuForm.get('site')?.value);
    formData.append('mois_concerne', this.MenuForm.get('mois_concerne')?.value);

    const fields = [
    
      'menus_generaux',
      'menus_dessert',
      'menu_s1',
      'menu_s2',
      'menu_s3',
      'menu_s4',
      'menu_s5'
    ];
    
    for (const field of fields) {
      if (this.fileToUpload) {
        formData.append(field, this.fileToUpload);
      }
    }
  
    this.menuService.updateMenuFormdata(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.openModal();
        this.router.navigate(['/listMenu']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
}
  
  
onFileSelected(event: any) {
  const fileInput = event.target as HTMLInputElement;
  const file: File | null = fileInput.files?.[0] || null;
  this.fileToUpload = file;

  if (file) {
    this.selectedFileName = file.name;
  } else {
    this.selectedFileName = null;
  }
}

  
}
