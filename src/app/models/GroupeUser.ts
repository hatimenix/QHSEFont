import { UserApp } from "./UserApp";

export class GroupeUser {
  id!:number;
  nom: string;
  description: string;
  proprietaire_groupe: UserApp[];
  //membres: UserApp[];
  proprietaire_groupe_names!:string;
  membres_names!:string;
  group?:any;
  groupe_name!:string;


  constructor(
    
    nom: string,
    description: string,
    proprietaire_groupe: UserApp[],
    // membres: UserApp[]
  ) {
    
    this.nom = nom;
    this.description = description;
    this.proprietaire_groupe = proprietaire_groupe;
    // this.membres = membres;
  }
}