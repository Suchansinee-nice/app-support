import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-eap0001-tab',
    templateUrl: './eap0001-tab.component.html',
    styleUrl: './eap0001-tab.component.scss',
    standalone: false
})
export class Eap0001TabComponent {
  selectedTab: string = 'scr02';

  constructor(private router: Router, private route: ActivatedRoute) {}

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  back() {
    this.router.navigate(['/eap0001']);
  }
}
