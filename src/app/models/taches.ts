export class Taches {
    id ?: number;
    nom_tache !: string;
    date_debut !: Date;
    echeance !: Date;
    description !: string;
    priorite !: string;
    assigne_a !: number;
    date_realisation !: Date;
    etat !: string;
    commentaire !: string;
    realisation_associee !: number;
    piece_jointe !: any;
    source !: number;
    utilisateur_name!: string;
    source_name!: string;


    constructor(nom_tache:string, 
        date_debut:Date, 
        echeance:Date, 
        description:string, 
        priorite:string, 
        assigne_a:number, 
        date_realisation:Date, 
        etat:string, 
        commentaire:string,
        source:number,
        utilisateur_name:string,
        source_name:string
        ){
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
            this.utilisateur_name=utilisateur_name;
            this.source_name=source_name;

        }
}
