// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { DialogPopupComponent } from '../dialog-popup/dialog-popup.component';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   entryComponents: [DialogPopupComponent],
// })
// export class HomeComponent implements OnInit {
//   isLoading: boolean = false;
//   isDialogOpen: boolean = false;

//   constructor(private router: Router, public dialog: MatDialog) {}

//   ngOnInit(): void {
//     const hasVisitedBefore = localStorage.getItem('hasVisited');
//     if (!hasVisitedBefore) {
//       this.openDialog();
//       localStorage.setItem('hasVisited', 'true');
//     }
//   }

//   openDialog(): void {
//     const dialogRef: MatDialogRef<DialogPopupComponent> = this.dialog.open(DialogPopupComponent, {
//       width: '250px',
//       disableClose: true,
//     });

//     this.isDialogOpen = true;

//     dialogRef.afterClosed().subscribe((result: string) => {
//       this.isDialogOpen = false;
//       if (result === 'signup') {
//         this.router.navigate(['/signup']);
//       } else if (result === 'login') {
//         this.router.navigate(['/login']);
//       }
//     });
//   }

//   signup() {
//     if (!this.isDialogOpen) {
//       this.isLoading = true; // Show the loader

//       setTimeout(() => {
//         this.router.navigate(['/signup']);
//       }, 500);
//     }
//   }

//   logIn() {
//     if (!this.isDialogOpen) {
//       this.isLoading = true; // Show the loader

//       setTimeout(() => {
//         this.router.navigate(['/login']);
//       }, 500);
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog-popup/dialog-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  entryComponents: [DialogPopupComponent],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  isDialogOpen: boolean = false;
  disableHover: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<DialogPopupComponent> = this.dialog.open(DialogPopupComponent, {
      disableClose: true,
    });

    this.isDialogOpen = true;
    this.disableHover = true; // Add the disable-hover class when the dialog is open

    dialogRef.afterClosed().subscribe((result: string) => {
      this.isDialogOpen = false;
      this.disableHover = false; // Reset the disableHover flag
      if (result === 'verified') {
        this.router.navigate(['/verified']);
      } else if (result === 'login') {
        this.router.navigate(['/login']);
      }
    });
  }

  signup() {
    if (!this.isDialogOpen) {
      this.isLoading = true; // Show the loader

      setTimeout(() => {
        this.router.navigate(['/verified']);
      }, 500);
    }
  }

  logIn() {
    if (!this.isDialogOpen) {
      this.isLoading = true; // Show the loader

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 500);
    }
  }
}


