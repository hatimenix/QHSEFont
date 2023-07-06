export class CertificatCalibration{
    id: number;
    nom: string;
    url_document: File;
    date_modification: Date;
    modifie_par: number;
    user_name: string;
  
    constructor(
      id: number,
      nom: string,
      url_document: File,
      date_modification: Date,
      modifie_par: number,
      user_name: string
    ) {
      this.id = id;
      this.nom = nom;
      this.url_document = url_document;
      this.date_modification = date_modification;
      this.modifie_par = modifie_par;
      this.user_name = user_name;
    }
}