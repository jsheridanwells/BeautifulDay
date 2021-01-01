import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer-modal',
  templateUrl: './footer-modal.component.html',
  styleUrls: ['./footer-modal.component.scss']
})
export class FooterModalComponent {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  @Input() copyType: string = '';
}
