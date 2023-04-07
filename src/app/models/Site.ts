export class Site{
    id!:number;
    site_nom!: string;
    sigle!:string;
    responsable_site!:number;
    groupe_retso!:string
    responsable_name!:string;

    constructor(
    site_nom: string='',
    sigle: string='',
    responsable_site: number=0,
    groupe_retso: string='',
    
    )
    {
        this.site_nom = site_nom; 
        this.sigle = sigle;
        this.responsable_site = responsable_site;
        this.groupe_retso = groupe_retso;
    }
}