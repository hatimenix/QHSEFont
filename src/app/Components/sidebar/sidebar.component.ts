// sidebar.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() showSidebar: boolean | undefined;

  constructor(private router: Router) {}

  isLinkActive(link: string) {
    return this.router.isActive(link, false);
  }
}
