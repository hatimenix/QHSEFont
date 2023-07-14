export class ArretTravail {
    id !: number;
    CMI_volet_recup !: string;
    date_debut_arret !: Date;
    date_fin_arret !: Date;
    duree_arret !: number;
    prolongation !: boolean;
    duree_total_pro !: number;
    rechute !: boolean;
    duree_total_rechute !: number;
    duree_total_arret !: number;
    evenement !: number;

    constructor(CMI_volet_recup:string, date_debut_arret:Date, date_fin_arret:Date, duree_arret:number,prolongation:boolean, duree_total_pro:number,
        rechute:boolean, duree_total_rechute: number,duree_total_arret:number ) {}
}
