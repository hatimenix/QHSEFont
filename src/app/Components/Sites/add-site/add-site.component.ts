import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiSiteService } from 'src/app/Services/Service-document-unique/api-site.service';
import { PersonnelService } from 'src/app/Services/Service-personnel/personnel.service';
import { Site } from 'src/app/models/site';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent {
  siteForm!: FormGroup;
  personnel$ !: Observable<any>;

  constructor(private fb: FormBuilder, 
    private siteService:  ApiSiteService,
     private router: Router,
     private personnelService: PersonnelService) {
  }

  ngOnInit(): void {
    const isFirstVisit = history.state.isFirstVisit;
    if (!isFirstVisit) {
      history.replaceState({ isFirstVisit: true }, '');
      location.reload();
    }
    window.scrollTo(0, 0);

    this.siteForm = this.fb.group({
      site_nom: ['', Validators.required],
      sigle: ['',Validators.required],
      responsable_site: [''],
      groupe_retso:['',Validators.required],
    });
    this.personnel$ = this.personnelService.getPersonnels();
  }
  onSubmit():void {
    const formData = this.siteForm.value;
    const site: Site= new Site (
      formData.site_nom,
      formData.sigle,
      formData.responsable_site,
      formData.groupe_retso,
     
    );
      
    
    this.siteService.addSite(site).subscribe(
      () => {      
        console.log("Le site a été ajouté avec succès");
        console.log(site);
        this.router.navigate(['/listsites']); 
      },
      (error: any) => {
        console.log("Une erreur s'est produite lors de l'ajout de site", error);        
      }
    );
  }
  
}
