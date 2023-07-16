import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {
  record: any;
  id: any;
  
  @ViewChild('pageContent', { static: true }) pageContent!: ElementRef;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.userService.getcategoryId();
    console.log(this.id); // Retrieve the ID from local storage
    this.getRecord();
  }

  getRecord() {
    this.userService.getTheIdofthirdpage(this.id).subscribe(
      (response: any) => {
        this.record = response;
        console.log('User data retrieved:', this.record);
      },
      (error: any) => {
        console.error('Error retrieving user data:', error);
      }
    );
  }
  downloadPage() {
    const element = this.pageContent.nativeElement;
    const button = element.querySelector('.download-button');
    if (button) {
      button.style.display = 'none';
    }
  
    const screenWidth = window.innerWidth;
    let pdfOrientation: 'p' | 'l' = 'l'; 
  
    if (screenWidth <= 600) {
      pdfOrientation = 'p'; 
    }
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(pdfOrientation, 'mm', 'a4', false);
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
  
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      const currentTime = new Date().toLocaleTimeString();
      const currentDate = new Date().toLocaleDateString();
  
      const datePositionX = pdf.internal.pageSize.getWidth() - 60;
      const datePositionY = pdf.internal.pageSize.getHeight() - 18;
      pdf.text(`Time: ${currentTime}`, datePositionX, datePositionY);
      pdf.text(`Date: ${currentDate}`, datePositionX, datePositionY - 10);
  
      pdf.save('registration-details.pdf');
      if (button) {
        button.style.display = 'block';
      }
    });
  }
  
  
  
  
}
