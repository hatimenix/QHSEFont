export class Taches {
    id ?: number;
    nom_tache !: string;
    date_debut !: Date;
    echeance !: Date;
    description !: string;
    priorite !: string;
    assigne_a !: string;
    date_realisation !: Date;
    etat !: string;
    commentaire !: string;
    realisation_associee !: number;
    piece_jointe !: any;

    constructor(nom_tache:string, 
        date_debut:Date, 
        echeance:Date, 
        description:string, 
        priorite:string, 
        assigne_a:string, 
        date_realisation:Date, 
        etat:string, 
        commentaire:string){
            this.nom_tache = this.nom_tache;
            this.date_debut = this.date_debut;
            this.echeance = this.echeance;
            this.description = this.description;
            this.priorite = this.priorite;
            this.assigne_a = this.assigne_a;
            this.date_realisation = this.date_realisation;
            this.etat = this.etat;
            this.commentaire = this.commentaire;
        }
}
