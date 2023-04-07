import { Component } from '@angular/core';
import { SecteurService } from 'src/app/Services/Service-secteur/secteur.service';
import { Secteur } from 'src/app/models/Secteur';

@Component({
  selector: 'app-lis-secteur',
  templateUrl: './lis-secteur.component.html',
  styleUrls: ['./lis-secteur.component.css']
})
export class LisSecteurComponent {
  secteur: Secteur[] = [];
  personnelService: any;

constructor(private secteurService: SecteurService) { }
ngOnInit(): void {
this.loadsecteur();
}
loadsecteur() {
this.secteurService.getSecteur().subscribe(
(data: Secteur[]) => {
this.secteur = data;
}
)
}
deleteSecteur(id: number) :void{
  this.secteurService.deleteSecteur(id).subscribe(() => {
    this.secteur = this.secteur.filter((p) => p.id !== id);
  });
}
}
