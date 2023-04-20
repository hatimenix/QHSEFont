export class Documentation {
    id!: number;
    nom!: string;
    codification!: string;
    version!: number;
    date_approbation!: Date;
    date_previsionnelle!: Date;
    nv_version!: boolean;
    type_docs!: string;
    url_document!: string;
    icon!: string;
   
    constructor(
        nom: string = '',
        codification: string = '',
        version: number = 0,
        date_approbation: Date,
        date_previsionnelle: Date,
        nv_version: boolean,
        type_docs: string,
        url_document: string,
        icon: string,
        
    ) {
        this.nom = nom;
        this.codification = codification;
        this.version = version;
        this.date_approbation = date_approbation;
        this.date_previsionnelle = date_previsionnelle;
        this.nv_version = nv_version;
        this.type_docs = type_docs;
        this.url_document = url_document;
        this.icon = icon;
       
    }
}
  