import { Component } from '@angular/core';

@Component({
  selector: 'app-add-registre-traitement',
  templateUrl: './add-registre-traitement.component.html',
  styleUrls: ['./add-registre-traitement.component.css']
})
export class AddRegistreTraitementComponent {
  ngOnInit(): void {
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
}
