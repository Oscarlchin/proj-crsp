import { Component, OnInit, Inject } from '@angular/core';
import { UserService, AlertService } from '../_services';
import { User } from '../_models';
import { EventService } from '../_services';
import { Event } from '../_models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CreateUserDialogData {
  newUsername: string;
  newPassword: string;
}

export interface UpdateUserDialogData {
  preUsername: string;
  newUsername: string;
  newPassword: string;
}

export interface RetrieveUserDialogData {
  username: string;
  favevents: [];
}

export interface DeleteUserDialogData {
  username: string;
}

@Component({
  selector: 'app-changeuser',
  templateUrl: './changeuser.component.html',
  styleUrls: ['./changeuser.component.css']
})
export class ChangeuserComponent implements OnInit {

  registerForm: FormGroup;
  updateForm: FormGroup;
  getOneForm: FormGroup;
  deleteOneForm: FormGroup;

  createOutput = '';
  updateOutput = '';
  getOneOutput = '';
  deleteOneOutput = '';

  constructor(
    private userService: UserService,
    private alert: AlertService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      newUsername : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      newPassword : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

    this.updateForm = this.formbuilder.group({
      preUpdateUsername : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      updateNewUsername : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      updateNewPassword : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

    this.getOneForm = this.formbuilder.group({
      getOneUsername : ['', [Validators.required]]
    });

    this.deleteOneForm = this.formbuilder.group({
      deleteOneUsername : ['', [Validators.required]]
    });
  }

  get registerf() { return this.registerForm.controls; }
  get updatef() { return this.updateForm.controls; }
  get getOnef() { return this.getOneForm.controls; }
  get deleteOnef() { return this.deleteOneForm.controls; }

  openCreateUserDialog(u, p) {
    this.dialog.open(CreateuserDialogComponent, {
      data: {
        newUsername: u,
        newPassword: p
      }
    });
  }

  openUpdateUserDialog(preU, u, p) {
    this.dialog.open(UpdateuserDialogComponent, {
      data: {
        preUsername: preU,
        newUsername: u,
        newPassword: p
      }
    });
  }

  openRetrieveUserDialog(u, f) {
    this.dialog.open(RetrieveuserDialogComponent, {
      data: {
        username: u,
        favevents: f
      }
    });
  }

  openDeleteUserDialog(u) {
    this.dialog.open(DeleteuserDialogComponent, {
      data: {
        username: u
      }
    });
  }

  createUser() {
    if (this.registerForm.invalid) {
      return;
  }
    const newUser: User = {
//        username : 'oscar100',
//       password : 'oscar100',
      username : this.registerForm.get('newUsername').value,
      password : this.registerForm.get('newPassword').value,
      favevents : []
    };
    console.log(newUser);
    this.userService.create(newUser).subscribe((event) => {
      // console.log(event);
      // if (this.registerForm.get('newUsername').value === ''
      // || this.updateForm.get('newPassword').value === '') {
      //  this.updateOutput = 'Please enter something!';
      // }
      this.openCreateUserDialog(this.registerForm.get('newUsername').value, this.registerForm.get('newPassword').value);
    },
    error => {this.alert.showAlert('This username already exist!'); }
    );
  }

  updateUser() {
    if (this.updateForm.invalid) {
      return;
  }
    const updateUser: User = {
      //       username : 'oscarUP',
      //       password : 'oscarUP',
             username : this.updateForm.get('updateNewUsername').value,
             password : this.updateForm.get('updateNewPassword').value,
             favevents : []
         };
//         console.log(this.updateForm.get('preUpdateUsername').value);
//         console.log(updateUser);
         this.userService.update(this.updateForm.get('preUpdateUsername').value, updateUser).subscribe((event) => {
//          if (this.updateForm.get('preUpdateUsername').value === ''
//          || this.updateForm.get('updateNewUsername').value === ''
//          || this.updateForm.get('updateNewPassword').value === '') {
//            this.updateOutput = 'Please enter something!';
          if (event == null) {
            {this.alert.showAlert('User not found on database. Please Check!'); }
          } else {
            this.openUpdateUserDialog(this.updateForm.get('preUpdateUsername').value,
            this.updateForm.get('updateNewUsername').value, this.updateForm.get('updateNewPassword').value);
          }
        },
        error => {this.alert.showAlert(
          'Either preUpdateUsername not found or updateNewUsername is identical to existing username, please change!'); }
         );
  }

  getOneUser() {
    if (this.getOneForm.invalid) {
      return;
  }
         this.userService.getByName(this.getOneForm.get('getOneUsername').value).subscribe((event) => {
          // if (this.getOneForm.get('getOneUsername').value === '') {
          // this.getOneOutput = 'Please enter something!';
            if (event == null) {
              {this.alert.showAlert('User not found on database. Please Check!'); }
            } else {
             this.openRetrieveUserDialog(event['username'], event['favevents']);
          }
         },
         error => {this.alert.showAlert('Error. Please Check!'); }
         );
  }

  deleteOneUser() {
    if (this.deleteOneForm.invalid) {
      return;
  }
 //   this.deleteOneOutput = ''; // reset to look better
    this.userService.delete(this.deleteOneForm.get('deleteOneUsername').value).subscribe((event) => {
  //    console.log(event);
      this.openDeleteUserDialog(this.deleteOneForm.get('deleteOneUsername').value);
    },
    error => {this.alert.showAlert('User not found on database. Please Check!'); }
    );
  }
}

@Component({
  selector: 'app-createuserdialog',
  templateUrl: './createuserDialog.component.html',
})
export class CreateuserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateUserDialogData,
   public dialogRef: MatDialogRef<CreateuserDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-updateuserdialog',
  templateUrl: './updateuserDialog.component.html',
})
export class UpdateuserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateUserDialogData,
   public dialogRef: MatDialogRef<UpdateuserDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-retrieveuserdialog',
  templateUrl: './retrieveuserDialog.component.html',
})
export class RetrieveuserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RetrieveUserDialogData,
   public dialogRef: MatDialogRef<RetrieveuserDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-deleteuserdialog',
  templateUrl: './deleteuserDialog.component.html',
})
export class DeleteuserDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData,
   public dialogRef: MatDialogRef<DeleteuserDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}
