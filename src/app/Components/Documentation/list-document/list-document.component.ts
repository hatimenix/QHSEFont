import { Component, OnInit } from '@angular/core';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';
import { Documentation } from 'src/app/models/Documentation';
import { Processus } from 'src/app/models/pocesus';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {
  document: Documentation[] = [];
  typeDocSelectionne!: string;
  filteredDocument: Documentation[] = [];
  processus: Processus[]=[];
  processusService: any;

 
constructor(private documentService: DocumentationService, processusService: ProcessusService) { }

ngOnInit(): void {
this.loaddocument();
this.filteredDocument = this.document;


}
loaddocument() {
this.documentService.getDocument().subscribe(
(data: Documentation[]) => {
this.document = data;
}
)
}
loadprocessus() {
  this.processusService.getProcessus().subscribe(
  (data: Processus[]) => {
  this.processus = data;
  }
  )
  }
deleteDocument(id: number) :void{
  this.documentService.deleteDocument(id).subscribe(() => {
    this.document = this.document.filter((d) => d.id !== id);
  });
}
filterDocs() {
  this.filteredDocument = this.document.filter(doc => doc.type_docs === this.typeDocSelectionne);
  
}
downloadFiche(id: number): void {
  this.documentService.downloadDocument(id).subscribe(
    (response: any) => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = response.fichier.split('/').pop();
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    (error: any) => {
      console.log(error);
    }
  );
}


}
