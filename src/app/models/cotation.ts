export class Cotation {
    id !: number;
    maitrise !: string;
    impact !: string;
    probabilite !: string;
    ipr !: string;
    indice !: string;
    date_evaluation !: Date;
    analyserisque !: number[];



    constructor(
        maitrise: string,
        impact: string,
        probabilite: string,
        ipr: string,
        indice: string,
        date_evaluation: Date,
        analyserisque: number[],


      ) {
        this.maitrise = maitrise;
        this.impact = impact;
        this.probabilite = probabilite;
        this.ipr = ipr;
        this.indice = indice;
        this.date_evaluation = date_evaluation;
        this.analyserisque = analyserisque;



      }
}
