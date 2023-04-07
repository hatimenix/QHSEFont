export class Evaluations {
    id !: number;
    date !: Date;
    probabilite !: number;
    severite !: number;
    frequences_exposition !: number;
    mesure_prevention !: string;
    ipr !: number;
    indice_risque !: number;
    danger !: number;

    constructor(
        probabilite: number,
        severite: number,
        frequences_exposition: number,
        ipr: number,
        indice_risque: number,
        mesure_prevention: string
      ) {
        this.probabilite = probabilite;
        this.severite = severite;
        this.frequences_exposition = frequences_exposition;
        this.ipr = ipr;
        this.indice_risque = indice_risque;
        this.mesure_prevention = mesure_prevention;
      }
}
