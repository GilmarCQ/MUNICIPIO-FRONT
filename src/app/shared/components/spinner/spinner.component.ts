import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public showSpinner: boolean;
  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.showSpinner = false;
   }

  ngOnInit(): void {
    this.init();
  }
  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status;
      this.cdRef.detectChanges();
    });
  }

}
