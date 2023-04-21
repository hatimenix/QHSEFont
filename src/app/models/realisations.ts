
export class Realisations {
    id !: number;
    action_associe !: number;
    action_realise !: string;
    date_realisation !: Date;
    etat !: string;

    constructor(action_realise:string, date_realisation:Date, etat:string) {
        this.action_realise = action_realise;
        this.date_realisation = date_realisation;
        this.etat = etat;
    }
}