import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
@ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  openGoogleMaps() {
    const address = '945 Av. Belvédère, Québec, QC G1S 3G2, Canada';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    const width = 800;
    const height = 500;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 4;
    const features = `width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, '_blank', features);
  }
  playMusic() {
    this.audioPlayer.nativeElement.play(); 
  }  
}
