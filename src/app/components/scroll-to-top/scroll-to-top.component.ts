import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {
  showScrollButton = false;

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const windowHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollPosition / (pageHeight - windowHeight)) * 100;

    this.showScrollButton = scrollPercentage > 30;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
