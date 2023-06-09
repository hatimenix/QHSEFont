export class Control {
    id!: number;
    site!: number; 
    nature_control!: string;
    origine_reglementaire!: string;
    date_dernier_control!: Date;
    date_control_suivant!: Date;
    action_ouverte!: string;
    rapport!:File;
    site_name!:string;
  }