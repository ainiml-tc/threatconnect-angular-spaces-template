import {
  Component
} from '@angular/core';

import {
  SpacesLoggingService,
  SpacesMessagesService
} from 'spaces-ng/';

import { TcOwnerService } from 'threatconnect-ng/';

@Component({
  templateUrl: './owners.component.html',
  selector: 'tc-owners',
})
export class OwnersComponent {
  contextData: string;
  firstRun = true;

  constructor(
    private logging: SpacesLoggingService,
    private messages: SpacesMessagesService,
    private tcOwner: TcOwnerService
  ) { /* empty block */
  }

  public loadOwners(id: string, type: string): void {
    this.logging.debug('loadOwners', '');
    if (this.firstRun) {
      this.firstRun = false;
      this.tcOwner.getByIndicator(id, type)
        .subscribe(
          res => {
            this.contextData = JSON.stringify(res, null, 4);
            this.messages.showSuccess('Success', 'Loading Owner');
          },
          err => {
            this.logging.error('Error', err);
            this.messages.showError('Failed', 'Loading Owner');
          }
        );
    }
  }
}
