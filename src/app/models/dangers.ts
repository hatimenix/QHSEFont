export class Dangers {
    id !: number;
    poste_de_travail !: string;
    taches !: string;
    description !: string;
    consequences !: string;
    service_name !: string;
    famille_name !: string;
    Site_name !: string;
    site !: number;
    service !: number;
    famille !: number;

    constructor(
        poste_de_travail: string = '',
        taches: string = '',
        description: string = '',
        consequences: string = '',
        site: number = 0,
        service: number = 0,
        famille: number = 0
      ) {
        this.poste_de_travail = poste_de_travail;
        this.taches = taches;
        this.description = description;
        this.consequences = consequences;
        this.site = site;
        this.service = service;
        this.famille = famille;
      }
}
