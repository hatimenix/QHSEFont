export class Processus {
    id! : number;
      intitule!: string;
      typologie!: string;
      sigle!: string;
      finalite!: string;
      pilote!: number;
      acteurs!: string;
      donnee_entree!: string;
      activites!: string;
      donnee_sortie!: string;
      ressources_tech_org!: string;
      objectifs_ind!: string;
      outils_surveil!: string;
      pilote_name!: string;
    
      constructor(
        
        intitule: string='',
        typologie: string='',
        sigle: string='',
        finalite: string='',
        pilote: number=0,
        acteurs: string='',
        donnee_entree: string='',
        activites: string='',
        donnee_sortie: string='',
        ressources_tech_org: string='',
        objectifs_ind: string='',
        outils_surveil: string='',
        
      ) {
        
        this.intitule = intitule;
        this.typologie = typologie;
        this.sigle = sigle;
        this.finalite = finalite;
        this.pilote = pilote;
        this.acteurs = acteurs;
        this.donnee_entree = donnee_entree;
        this.activites = activites;
        this.donnee_sortie = donnee_sortie;
        this.ressources_tech_org = ressources_tech_org;
        this.objectifs_ind = objectifs_ind;
        this.outils_surveil = outils_surveil;
        
      }
    }