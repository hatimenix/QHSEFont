import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Qualite } from 'src/app/models/qualite';
import { QualiteService } from 'src/app/Services/Service-qualite/qualite.service';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { Site } from 'src/app/models/site';

declare var window: any;

@Component({
  selector: 'app-list-qualite',
  templateUrl: './list-qualite.component.html',
  styleUrls: ['./list-qualite.component.css']
})
export class ListQualiteComponent {
  sites: any[] = [];
  selectedSite: Site | undefined;
  updateModalVisible: boolean = true;
  @ViewChild('successModal', { static: true }) successModal:any; 
  @ViewChild('siteModal', { static: true }) siteModal:any;
  modalRef!: BsModalRef;
  p = 1; 
  itemsPerPage: number = 5;
  id : any 
  site_name:any
  site:any
  titre:any
  date_analyse:any
  reflexion:any
  objectifs:any
  commentaires_responsable:any
  objectifs_annees:any
  searchQuery: string = '';
  qualites : Qualite[] = []
  deleteModal: any;
  idTodelete: number = 0;

  form = new FormGroup({
    site: new FormControl(''),
    titre: new FormControl(''),
    date_analyse: new FormControl(''),
    reflexion: new FormControl(''),
    objectifs: new FormControl(''),
    commentaires_responsable: new FormControl(''),
    objectifs_annees: new FormControl(''),


  });
  constructor(private   qualiteservice : QualiteService, private router : Router,private apiSiteService :ApiSiteService,private bsModalService: BsModalService){

  }
  ngOnInit(): void {

    this.apiSiteService.getAllSite().subscribe(
      (data: any[]) => {
        this.sites = data;
        console.log(this.sites); // Print the sites to the console
      },
      (error: any) => {
        console.log(error); // Handle error
      }
    );
    this.getQualites();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('delete')
    );
  }
  getQualites() {
    this.qualiteservice.getAll().subscribe(
      res => {
        this.qualites = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  updateQualite() : void {

    const formData =  new FormData()
    formData.append("site", this.site);
    formData.append("titre", this.titre);
      if (this.date_analyse !== null && this.date_analyse !== undefined) {
        formData.append("date_analyse", this.date_analyse);
    }
    formData.append("reflexion", this.reflexion);
    formData.append("objectifs", this.objectifs);
    formData.append("commentaires_responsable", this.commentaires_responsable);
    formData.append("objectifs_annees", this.objectifs_annees);

  
    this.qualiteservice.update(this.id, formData)
  
        .subscribe({
            next: (res) => {
                console.log(res);
                this.openModal();
                this.updateModalVisible = false;
            },
            error: (e) => {
                console.error(e);
            }
        });
  } 
  getQualiteData( id : number,
    site:any,
    titre : any,
    date_analyse: any,
    reflexion:any,
    objectifs:any,
    commentaires_responsable:any,
    objectifs_annees:any,
  
    ){
      this.id = id,
      this.site=site,
      this.titre=titre,
      this.date_analyse = date_analyse,
      this.reflexion = reflexion,
      this.objectifs = objectifs,
      this.commentaires_responsable = commentaires_responsable,
      this.objectifs_annees=objectifs_annees
  }
  navigateToQualite() {
    this.router.navigate(['/add-qualite']);
  }
  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
  
  
  delete() {
    this.qualiteservice.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.qualites = this.qualites.filter(_ => _.id != this.idTodelete)
        location.reload()
        this.deleteModal.hide();
      },
      error:(err) => {
        console.log(err);
      }
  
  
      
    });
  }
  openModal() {
    this.modalRef = this.bsModalService.show(this.successModal);
  }
  closeModal() {
    this.bsModalService.hide();
    location.reload();
  }
  openSiteModal(site: Site) {
    this.selectedSite = site;
    this.modalRef = this.bsModalService.show(this.siteModal);
  }
  closeModalsite(){
      this.bsModalService.hide();
  }
  

}
