export class Secteur{
  id! : number;
  secteur_nom!: string;

  constructor(
    
    secteur_nom: string='',
    
    ) {
    
    this.secteur_nom = secteur_nom;

  }
}