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
    source !: string;

    constructor(nom_tache:string, 
        date_debut:Date, 
        echeance:Date, 
        description:string, 
        priorite:string, 
        assigne_a:string, 
        date_realisation:Date, 
        etat:string, 
        commentaire:string,
        source:string){
            this.nom_tache = nom_tache;
            this.date_debut = date_debut;
            this.echeance = echeance;
            this.description = description;
            this.priorite = priorite;
            this.assigne_a = assigne_a;
            this.date_realisation = date_realisation;
            this.etat = etat;
            this.commentaire = commentaire;
            this.source = source;
        }
}
