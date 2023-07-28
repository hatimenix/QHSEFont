import { GroupeUser } from "./GroupeUser";

export class UserApp {
  id!: number;
  nom_user: string;
  password: string;
  email: string;
  actif: boolean;
  groupes_roles: GroupeUser[];
  nom_groupe!: string;
  send_email: boolean; 
  image?: any;
  compte: string; // Required parameter should be before optional parameters
  nom!: string;
  courrier!: string;
  numero_tel!: string;
  presente_vous!: string;
  fonction!: string;
  adresse_sip!: string;
  othermail!: string;

  constructor(
    id: number,
    nom_user: string,
    password: string,
    email: string,
    actif: boolean,
    groupes_roles: GroupeUser[],
    send_email: boolean,
    compte: string,
    nom: string,
    courrier: string,
    numero_tel: string,
    presente_vous: string,
    fonction: string,
    adresse_sip: string,
    othermail: string,
    image?: any,
 
  ) {
    this.id = id;
    this.nom_user = nom_user;
    this.password = password;
    this.email = email;
    this.actif = actif;
    this.groupes_roles = groupes_roles;
    this.send_email = send_email;
    this.compte = compte; // Assign the required parameter first
    this.image = image;
    this.nom = nom;
    this.courrier = courrier;
    this.numero_tel = numero_tel;
    this.presente_vous = presente_vous;
    this.fonction = fonction;
    this.adresse_sip = adresse_sip;
    this.othermail = othermail;
  }
}
