import { Component } from '@angular/core';
import { Qcm } from '../core/models/qcm.model';
import { QcmService } from '../service/qcm.service';

@Component({
  selector: 'app-qcm-detail',
  templateUrl: './qcm-detail.component.html',
  styleUrls: ['./qcm-detail.component.css']
})
export class QcmDetailComponent {
    qcm?: Qcm|null = null;

    constructor(
        private qcmService: QcmService
    ) {

    }

    ngOnInit(){
        console.log("init");
    }

}
