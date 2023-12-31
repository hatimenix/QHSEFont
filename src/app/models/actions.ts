export class Actions {
  id !: number;
  intitule !: string;
  type_action !: string;
  origine_action !: string;
  reference !: string;
  domaine !: string;
  site !: number;
  Proccesus_name !: string;
  Site_name !: string;
  processus !: number;
  analyse_cause !: string;
  plan_action !: string;
  delai_mise_en_oeuvre !: Date;
  assigne_a !: number;
  priorite !: number;
  delai_mesure_eff !: Date;
  type_critere_eff !: string;
  detail_critere_eff !: string;
  etat !: string;
  piece_jointe !: any;
  annee !: Date;
  danger !: number[];
  evenement !: number[];
  qualite !: number[];
  nc !: number[];
  analyserisque !: number[];
  tache !: number[];
  ca !: number[];
  utilisateur_name!: string;

  rn !: number[];
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
    assigne_a: number,
    priorite: number,
    delai_mesure_eff: Date,
    type_critere_eff: string,
    detail_critere_eff: string,
    annee: Date,
    etat: string,
    piece_jointe: any,
    danger: number[],
    evenement: number[],
    qualite: number[],
    nc: number[],
    analyserisque: number[],
    tache: number[],
    ca: number[],
    rn: number[]



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
    this.annee = annee;
    this.etat = etat;
    this.piece_jointe = piece_jointe;
    this.danger = danger;
    this.evenement = evenement;
    this.qualite = qualite;
    this.nc = nc;
    this.analyserisque = analyserisque;
    this.tache = tache;
    this.ca = ca;
    this.rn = rn;





  }
}
