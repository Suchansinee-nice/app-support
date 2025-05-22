import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('100ms', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('100ms', style({ opacity: 0 }))
            ])
        ])
    ],
    standalone: false
})
export class MainMenuComponent {
  isSidebarHidden = false;
  showScrollTop = false;
  showScrollBottom = false;
  currentDateTime: string = '';
  private intervalId: any;

  constructor(public router: Router) {
    
  }

  ngOnInit() {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000);
    this.onWindowScroll()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showScrollTop = window.pageYOffset > 50;

    const scrollPosition = window.scrollY; // ตำแหน่งที่เลื่อนลง
    const pageHeight = document.documentElement.scrollHeight; // ความสูงของหน้าเว็บ
    const windowHeight = window.innerHeight; // ความสูงของหน้าต่างที่มองเห็น
    const triggerBottom = 100;    

    this.showScrollBottom = (pageHeight - (scrollPosition + windowHeight)) > triggerBottom 
      || (scrollPosition == 0 && pageHeight > windowHeight)
    // ตรวจสอบว่าผู้ใช้เลื่อนถึงจุดสุดท้ายหรือยัง
    // if (scrollPosition + windowHeight >= pageHeight - 1) {
    //   console.log('เลื่อนถึงจุดสุดท้ายแล้ว!'+""+(pageHeight));
    // }
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = this.formatDateTime(now);
  }

  formatDateTime(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear()+543;
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
