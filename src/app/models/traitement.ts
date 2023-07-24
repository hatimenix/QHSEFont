export class Traitement {
    id!: number;
    fournisseur!: number;
    typeregistre?: string;
    nomtraitement?: string;
    description_generale?: string;
    datedecreation?: Date;
    datedemiseajour?: Date;
    responsable_traitement?: number;
    finaliteprincipale?: string;
    sous_finalite1?: string;
    sous_finalite2?: string;
    sous_finalite3?: string;
    sous_finalite4?: string;
    donneesensible?: boolean;
    type_donnee?: string;
    categorie?: string;
    description?: string;
    dureedeconcesrvation?: string;
    personneconcernees?: string;
    precisions?: string;
    typedestinataire?: string;
    precision?: string;
    donneeconcernees?: string;
    mtypedemesuredesecurite?: string;
    destinataire?: string;
    pays?: string;
    typedegarantie?: string;
    lienversladocumentation?: string;
    lesdonneesconcernee?: string;
    fournisseur_name!: string | null;
    fournisseur_dpo?: string;
    fournisseur_representant?: string;
    fournisseur_dpoName!: string | null;
    fournisseur_representantName!: string | null
    responsable_name!: string | null

  }
  