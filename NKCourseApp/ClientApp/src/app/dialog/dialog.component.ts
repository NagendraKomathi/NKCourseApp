import { Component, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  openModal() {
    //var data = null;//call api
    //this.dialogService.openModal("Title1", "Message Test", () => {
    //  //confirmed
    //  console.log('Yes');
    //}, () => {
    //  //not confirmed
    //  console.log('No');
    //});
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //     id: 1,
    //     title: 'Angular For Beginners'
    // };

    // const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    // });
  }

}
