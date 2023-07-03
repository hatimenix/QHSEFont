export class AnalyseRisques {
    id !: number;
    site !: number;
    description !: string;
    typologie !: string;
    axe !: string;
    famille !: string;
    indice !: string;
    niveau_risque !: string;
    date_evaluation !: Date;
    opportunite !: string;
    origine !: string;
    Proccesus_name !: string;
    Site_name !: string;
    processus !: number[];
    contexte_int !: string;
    contexte_ext !: string;
    consequences!: string;
    impact !: string;
    probabilite !: string;
    maitrise !: string;
    mesure !: string;
    type_action !: string;
    partieinteresses !: number[];



    constructor(
        site: number,
        description: string,
        typologie: string,
        axe: string,
        famille: string,
        indice: string,
        niveau_risque: string,
        date_evaluation: Date,
        opportunite: string,
        origine: string,
        processus: number[],
        contexte_int: string,
        contexte_ext: string,
        impact: string,
        probabilite: string,
        maitrise : string,
        mesure : string,
        type_action : string,
        partieinteresses: number[], 

      ) {
        this.site = site;
        this.description = description;
        this.typologie = typologie;
        this.axe = axe;
        this.famille = famille;
        this.indice = indice;
        this.niveau_risque = niveau_risque;
        this.date_evaluation = date_evaluation;
        this.opportunite = opportunite;
        this.origine = origine;
        this.processus = processus;
        this.contexte_int = contexte_int;
        this.contexte_ext = contexte_ext;
        this.impact = impact;
        this.probabilite = probabilite;
        this.maitrise = maitrise;
        this.mesure = mesure;
        this.type_action = type_action;
        this.partieinteresses = partieinteresses;
      }
}
