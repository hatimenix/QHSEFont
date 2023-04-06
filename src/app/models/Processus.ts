import { Personnel } from "./Personnel";


export class Processus {
id! : number;
  intitule!: string;
  typologie!: string;
  sigle!: string;
  finalite!: string;
  pilote!: Personnel;
  acteurs!: string;
  donnee_entree!: string;
  activites!: string;
  donnee_sortie!: string;
  ressources_tech_org!: string;
  objectifs_ind!: string;
  outils_surveil!: string;
}
