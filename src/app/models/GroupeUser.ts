import { UserApp } from "./UserApp";

export class GroupeUser {
  id!:number;
  nom: string;
  description: string;
  proprietaire_groupe: UserApp[];
  membres: UserApp[];


  constructor(
    id:number,
    nom: string,
    description: string,
    proprietaire_groupe: UserApp[],
    membres: UserApp[]
  ) {
    this.id=id;
    this.nom = nom;
    this.description = description;
    this.proprietaire_groupe = proprietaire_groupe;
    this.membres = membres;
  }
}