export class Commande {
    id_commande!: number;
    
    date_commande!: string;
    type_commande!: string;
    etat_commande!: string;
    quantite!: string;
    specificite_regime!: string; 
    specificite_texture!: string;
    site !: number;
    site_name!:string;
    [key: string]: any; 
    

    
}