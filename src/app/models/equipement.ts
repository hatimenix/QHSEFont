export class Equipement {
    id!: number
    site!: number | null
    secteur!: number | null
    site_name!: string | null
    secteur_name!: string | null
    type_equipement!: string | null
    codification!: string | null
    date_mise_en_service!: Date | null
    date_modification!: Date | null
    verification!: string | null
    prochaine_verification!: Date | null
    commentaires!: string | null
    Equipement_declasse!: string | null
    N_serie!: string | null
    Certificat?: any | null;
}
