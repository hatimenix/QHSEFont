import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentationService } from 'src/app/Services/Service-documentation/documentation.service';
import { Documentation } from 'src/app/models/Documentation';

@Component({
  selector: 'app-details-docs',
  templateUrl: './details-docs.component.html',
  styleUrls: ['./details-docs.component.css']
})
export class DetailsDocsComponent implements OnInit{
 
  id!: number;
  currentId:any
  constructor(private documentService: DocumentationService, 
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = +id;
        this.documentService.getDocumntById(this.id).subscribe(doc => {
          this.currentId = doc;
        });
      }
    });
   
  }

 
}