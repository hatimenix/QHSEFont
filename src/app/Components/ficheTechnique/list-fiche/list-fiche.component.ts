import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FicheserService } from 'src/app/Services/Service-fiche-restauration/ficheser.service';
import { FicheTechnique } from 'src/app/models/FicheTechnique';

@Component({
  selector: 'app-list-fiche',
  templateUrl: './list-fiche.component.html',
  styleUrls: ['./list-fiche.component.css']
})
export class ListFicheComponent implements OnInit {
  fiches!: FicheTechnique[];
  typePlatSelectionne!: string;

  myForm: any;

  constructor(private ficheService: FicheserService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      type_plat: new FormControl()
    });
    this.getFiches();

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

  getFiches(): void {
    this.ficheService.getAllFiches().subscribe((fiches) => {
      this.fiches = fiches;
      
    });
  }

  deleteFiche(id: number): void {
    this.ficheService.deleteFiche(id).subscribe(() => {
      this.fiches = this.fiches.filter((f) => f.id_fiche !== id);
    });
  }

  downloadFiche(id: number): void {
    this.ficheService.downloadFiche(id).subscribe(
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

  filterFiches(): void {
    if (this.typePlatSelectionne) {
      this.ficheService.getAllFiches().subscribe((fiches) => {
        this.fiches = fiches.filter((f) => f.type_plat === this.typePlatSelectionne);
      });
    } else {
      this.getFiches();
    }
  }
}
