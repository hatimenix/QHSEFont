import { GroupeUser } from "./GroupeUser";

export class UserApp {
    id!:number;
    nom_user: string;
    nom_complet: string;
    password: string;
    adresse_email: string;
    actif: boolean;
    groupes_roles: GroupeUser[];
    nom_groupe!:string;
  
    constructor(
      id:number,
      nom_user: string,
      nom_complet: string,
      password: string,
      adresse_email: string,
      actif: boolean,
      groupes_roles: GroupeUser[]
    ) {
      
      this.id=id;
      this.nom_user = nom_user;
      this.nom_complet = nom_complet;
      this.password = password;
      this.adresse_email = adresse_email;
      this.actif = actif;
      this.groupes_roles = groupes_roles;
    }
  }
  