import { UserApp } from "./UserApp";

export class GroupeUser {
  id!:number;
  nom: string;
  description: string;
  proprietaire_groupe: UserApp[];
  proprietaire_groupe_names!:string;
  membres_names!:string;
  autorisation!:string;
  groupe_name!:string;


  constructor(
    
    nom: string,
    description: string,
    proprietaire_groupe: UserApp[],
    autorisation:string
    
  ) {
    
    this.nom = nom;
    this.description = description;
    this.proprietaire_groupe = proprietaire_groupe;
    this.autorisation=autorisation
  }
}