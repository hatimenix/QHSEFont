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
    evenement !: number[];

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
        danger: number[]
      ) {}
}
