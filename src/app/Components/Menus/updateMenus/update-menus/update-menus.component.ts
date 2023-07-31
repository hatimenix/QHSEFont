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
    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('site', this.MenuForm.get('site')?.value);
    formData.append('mois_concerne', this.MenuForm.get('mois_concerne')?.value);
    
    if (this.MenuForm.get('menus_generaux')?.value) {
      formData.append('menus_generaux', this.MenuForm.get('menus_generaux')?.value);
    }
    
    if (this.MenuForm.get('menus_dessert')?.value) {
      formData.append('menus_dessert', this.MenuForm.get('menus_dessert')?.value);
    }
    
    if (this.MenuForm.get('menu_s1')?.value) {
      formData.append('menu_s1', this.MenuForm.get('menu_s1')?.value);
    }
    
    if (this.MenuForm.get('menu_s2')?.value) {
      formData.append('menu_s2', this.MenuForm.get('menu_s2')?.value);
    }
    
    if (this.MenuForm.get('menu_s3')?.value) {
      formData.append('menu_s3', this.MenuForm.get('menu_s3')?.value);
    }
    
    if (this.MenuForm.get('menu_s4')?.value) {
      formData.append('menu_s4', this.MenuForm.get('menu_s4')?.value);
    }
    
    if (this.MenuForm.get('menu_s5')?.value) {
      formData.append('menu_s5', this.MenuForm.get('menu_s5')?.value);
    }
    
    if (this.fileToUpload) {
      formData.append('fichier', this.fileToUpload);
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
  
  
onFileSelected(event: any, field: string) {
  const file: File = event.target.files[0];
  this.MenuForm.get(field)?.setValue(file);
}


  
}
