export class Actions {
    id ?: number;
    intitule !: string;
    type_action !: string;
    origine_action !: string;
    reference !: string;
    domaine !: string;
    site !: number;
    Site_name !: string;
    processus !: number;
    analyse_cause !: string;
    plan_action !: string;
    delai_mise_en_oeuvre !: Date;
    assigne_a !: string;
    priorite !: number;
    delai_mesure_eff !: Date;
    type_critere_eff !: string;
    detail_critere_eff !: string;
    etat ?: string;
    piece_jointe ?: any | null;
    annee ?: Date;
    danger !: number[];
    evenement !: number[] | null;

    constructor(
        intitule: string,
        type_action: string,
        origine_action: string,
        reference: string,
        domaine: string,
        site: number,
        processus: number,
        analyse_cause: string,
        plan_action: string,
        delai_mise_en_oeuvre: Date,
        assigne_a: string,
        priorite: number,
        delai_mesure_eff: Date,
        type_critere_eff: string,
        detail_critere_eff: string,
        danger: number[],
        evenement: number[]
      ) {
        this.intitule = intitule;
        this.type_action = type_action;
        this.origine_action = origine_action;
        this.reference = reference;
        this.domaine = domaine;
        this.site = site;
        this.processus = processus;
        this.analyse_cause = analyse_cause;
        this.plan_action = plan_action;
        this.delai_mise_en_oeuvre = delai_mise_en_oeuvre;
        this.assigne_a = assigne_a;
        this.priorite = priorite;
        this.delai_mesure_eff = delai_mesure_eff;
        this.type_critere_eff = type_critere_eff;
        this.detail_critere_eff = detail_critere_eff;
        this.danger = danger;
        this.evenement = evenement;
      }
}
