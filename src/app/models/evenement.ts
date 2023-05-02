export class Evenement {
    id !: number;
    type_contract !: string;
    nom_personne !: string;
    type_evenement !: string;
    intitule !: string;
    resume !: string;
    temoins !: string;
    premiere_pers_info !: string;
    action_immediate !: string;
    date_accident !: Date;
    periode_travail !: string;
    lieu_accident !: string;
    tache_effectue !: string;
    utiliser_chien !: Boolean;
    siege_de_lesions_1 !: string;
    siege_de_lesions_2 !: string;
    nature_lesions !: string;
    service_name !: string;
    arret_travail !: Boolean;
    Site_name !: string;
    danger_name !: string[];
    site !: number;
    service !: number;
    dangers!: number[];

    constructor(type_contract:string,
        nom_personne:string,
        type_evenement:string,
        intitule:string,
        resume:string,
        temoins:string,
        premiere_pers_info:string,
        action_immediate:string,
        date_accident:Date,
        periode_travail:string,
        lieu_accident:string,
        tache_effectue:string,
        utiliser_chien:boolean,
        siege_de_lesions_1:string,
        siege_de_lesions_2:string,
        nature_lesions:string,
        site:number,
        service:number,
        dangers:number[]
        ){}

}
