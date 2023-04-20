import { Component, OnInit } from '@angular/core';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';

import { Documentation } from 'src/app/models/Documentation';
@Component({
  selector: 'app-list-documentation',
  templateUrl: './list-documentation.component.html',
  styleUrls: ['./list-documentation.component.css']
})
export class ListDocumentationComponent implements OnInit {
  document: Documentation[] = [];

  constructor(private documentService: DocumentationService) {}

  ngOnInit(): void {
    this.loaddocument();
  }

  loaddocument() {
    this.documentService.getDocument().subscribe(
      (data: Documentation[]) => {
        this.document = data;
        console.log(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.document = this.document.filter((d) => d.id !== id);
    });
  }
}
