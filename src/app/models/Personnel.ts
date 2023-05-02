export class Personnel {
    id! : number;
    compte!: string;
    nom!: string;
    courrier!: string;
    numero_tel!: string;
    presente_vous!: string;
    image?: File;
    fonction!: string;
    adresse_sip!: string;
    othermail!: string;

    constructor(
       id: number=0,
       compte: string="",
       nom: string ="",
       courrier: string="",
       numero_tel: string="",
       presente_vous: string="",
       fonction: string="",
       adresse_sip: string="",
       othermail: string="",
       image?: File,
    ) {
      this.id= id; 
      this.compte = compte;
      this.nom = nom;
      this.courrier= courrier; 
      this.compte = compte;
      this.numero_tel = numero_tel;
      this.presente_vous= presente_vous; 
      this.fonction = fonction;
      this.adresse_sip = adresse_sip;
      this.othermail= othermail; 
      this.image= image;
      
      


    }
  
  }