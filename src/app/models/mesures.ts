export class Mesures {
    id !: number;
    date_cloture !: Date;
    resultat_mesure_eff !: string;
    mesure_eff !: string;
    cout !: number;
    action_associee !: number;

    constructor(date_cloture:Date, resultat_mesure_eff:string, mesure_eff:string, cout:number){
        this.date_cloture = date_cloture;
        this.resultat_mesure_eff = resultat_mesure_eff;
        this.mesure_eff = mesure_eff;
        this.cout = cout;
    }
}
