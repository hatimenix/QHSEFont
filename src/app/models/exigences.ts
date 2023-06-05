export class Exigences {
    id !: number;
    type_exigence !: string;
    intitule !: string;
    evaluation_maitrise !: string;
    description !: string;
    commentaire !: string;
    action !: boolean;
    partieinteresses !: number[];
    partieinteresses_name !: string;



    constructor(
        type_exigence: string,
        intitule: string,
        evaluation_maitrise: string,
        description: string,
        commentaire: string,
        action: boolean,
        partieinteresses: number[],
        partieinteresses_name: string


      ) {
        this.type_exigence = type_exigence;
        this.intitule = intitule;
        this.evaluation_maitrise = evaluation_maitrise;
        this.description = description;
        this.commentaire = commentaire;
        this.action = action;
        this.partieinteresses = partieinteresses;
        this.partieinteresses_name = partieinteresses_name;



      }
}
