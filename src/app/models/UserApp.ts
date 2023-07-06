import { GroupeUser } from "./GroupeUser";

export class UserApp {
  id!: number;
  nom_user: string;
  nom_complet: string;
  password: string;
  email: string;
  actif: boolean;
  groupes_roles: GroupeUser[];
  nom_groupe!: string;
  send_email: boolean; 
  image?: string;

  // the added one 
  permissions: string[]; 
  constructor(
    id: number,
    nom_user: string,
    nom_complet: string,
    password: string,
    email: string,
    actif: boolean,
    groupes_roles: GroupeUser[],
    send_email: boolean,
    permissions: string[],
    image?: string,
  ) {
    this.id = id;
    this.nom_user = nom_user;
    this.nom_complet = nom_complet;
    this.password = password;
    this.email = email;
    this.actif = actif;
    this.groupes_roles = groupes_roles;
    this.send_email = send_email;
    this.image= image;

    this.permissions = permissions;  
  }
}

  