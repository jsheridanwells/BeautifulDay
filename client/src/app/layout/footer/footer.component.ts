import { Component } from '@angular/core';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { FooterModalComponent } from './footer-modal/footer-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private modalService: NgbModal
  ) { }

  modalOpen(component: string): void {
    const modalRef = this.modalService.open(FooterModalComponent);
    modalRef.componentInstance.copyType = component;
  }
}
