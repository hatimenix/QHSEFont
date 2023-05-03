export class Analyses {
    id!: number;
    cause !: string;
    probabilite !: number;
    frequences !: number;
    severite !: number;
    niveau_risque !: number;
    arbe_cause !: any;
    danger_name !: string[];
    danger_lie !: number[];
    evenement !: number;

    constructor(cause:string, 
        probabilite:number, 
        frequencies:number, 
        severite:number, 
        niveau_risque:number, 
        arbe_cause:any
        ){}
}
