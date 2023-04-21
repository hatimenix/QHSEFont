import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProcessusService } from 'src/app/Services/Service-processus/processus.service';

import { Personnel } from 'src/app/models/Personnel';

import { Processus } from 'src/app/models/pocesus';


@Component({
  selector: 'app-list-processus',
  templateUrl: './list-processus.component.html',
  styleUrls: ['./list-processus.component.css']
})
export class ListProcessusComponent implements OnInit {
  
  processus: Processus[] = [];
  personnelService: any;
  //modal
  @ViewChild('deleteModal', { static: true }) deleteModal!: any;
  modalRef!: BsModalRef;
  ProIdToDelete: number = 0;
  
constructor(private processusService: ProcessusService,public modalService: BsModalService) { }
ngOnInit(): void {
this.loadprocessus();
}
loadprocessus() {
this.processusService.getProcessus().subscribe(
(data: Processus[]) => {
this.processus = data;
}
)
}
deleteProcessus(id: number) :void{
  this.processusService.deleteProcessus(id).subscribe(() => {
    this.processus = this.processus.filter((p) => p.id !== id);
  });
}
 //delete modal
 confirmDelete(): void {
  this.processusService.deleteProcessus(this.ProIdToDelete)
    .subscribe(() => {
      this.processus = this.processus.filter(c => c.id !== this.ProIdToDelete);
      this.modalRef.hide();
    });
}

  declineDelete(): void {
  this.modalRef.hide();
  }
}
