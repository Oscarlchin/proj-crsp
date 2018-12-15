import { Component, OnInit, Inject } from '@angular/core';
import { AlertService } from '../_services';
import { EventService } from '../_services';
import { Event } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EDEADLK } from 'constants';
import { url } from 'inspector';

export interface CreateEventDialogData {
  newprogram_id: Number;
  newprogram_name: String;
  newdistrict: String;
  newvenue: String;
  newstart_date: String;
  newend_date: String;
  newdayinweek: String;
  newstart_time: String;
  newend_time: String;
  newtype_name: String;
  newfee: Number;
  newquota: Number;
  newquota_left: Number;
  newmin_age: Number;
  newmax_age: Number;
  newurl: String;
}

export interface UpdateEventDialogData {
  updateprogram_id: Number;
  updateprogram_name: String;
  updatedistrict: String;
  updatevenue: String;
  updatestart_date: String;
  updateend_date: String;
  updatedayinweek: String;
  updatestart_time: String;
  updateend_time: String;
  updatetype_name: String;
  updatefee: Number;
  updatequota: Number;
  updatequota_left: Number;
  updatemin_age: Number;
  updatemax_age: Number;
  updateurl: String;
}

export interface RetrieveEventDialogData {
  newprogram_id: Number;
  newprogram_name: String;
  newdistrict: String;
  newvenue: String;
  newstart_date: String;
  newend_date: String;
  newdayinweek: String;
  newstart_time: String;
  newend_time: String;
  newtype_name: String;
  newfee: Number;
  newquota: Number;
  newquota_left: Number;
  newmin_age: Number;
  newmax_age: Number;
  newurl: String;
}

export interface DeleteEventDialogData {
  newprogram_id: Number;
  newprogram_name: String;
  newdistrict: String;
  newvenue: String;
  newstart_date: String;
  newend_date: String;
  newdayinweek: String;
  newstart_time: String;
  newend_time: String;
  newtype_name: String;
  newfee: Number;
  newquota: Number;
  newquota_left: Number;
  newmin_age: Number;
  newmax_age: Number;
  newurl: String;
}

@Component({
  selector: 'app-changeevent',
  templateUrl: './changeevent.component.html',
  styleUrls: ['./changeevent.component.css']
})
export class ChangeeventComponent implements OnInit {

  registerEventForm: FormGroup;
  updateEventForm: FormGroup;
  getOneEventForm: FormGroup;
  deleteOneEventForm: FormGroup;

  createEventOutput = '';
  updateEventOutput = '';
  getOneEventOutput = '';
  deleteOneEventOutput = '';

  constructor(
    private eventService: EventService,
    private alert: AlertService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog
    ) { }

  ngOnInit() {

    this.registerEventForm = this.formbuilder.group({
      newProgramID : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newProgramName : ['', [Validators.required]],
      newVenue : ['', [Validators.required]],
      newDistrict : ['', [Validators.required]],
      newStartdate : ['', [Validators.required]],
      newEnddate : ['', [Validators.required]],
      newDayinweek : ['', [Validators.required]],
      newStarttime : ['', [Validators.required]],
      newEndtime : ['', [Validators.required]],
      newTypename : ['', [Validators.required]],
      newFee : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newQuota : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newQuotaleft : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newMinimumage : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newMaximumage : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      newURL : ['', [Validators.required]]
    });

    this.updateEventForm = this.formbuilder.group({

      updateProgramID : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateProgramName : ['', [Validators.required]],
      updateVenue : ['', [Validators.required]],
      updateDistrict : ['', [Validators.required]],
      updateStartdate : ['', [Validators.required]],
      updateEnddate : ['', [Validators.required]],
      updateDayinweek : ['', [Validators.required]],
      updateStarttime : ['', [Validators.required]],
      updateEndtime : ['', [Validators.required]],
      updateTypename : ['', [Validators.required]],
      updateFee : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateQuota : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateQuotaleft : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateMinimumage : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateMaximumage : ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      updateURL : ['', [Validators.required]]
    });

    this.getOneEventForm = this.formbuilder.group({
      getOneProgramID : ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.deleteOneEventForm = this.formbuilder.group({
      deleteOneProgramID : ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get registerEventf() { return this.registerEventForm.controls; }
  get updateEventf() { return this.updateEventForm.controls; }
  get getOneEventf() { return this.getOneEventForm.controls; }
  get deleteOneEventf() { return this.deleteOneEventForm.controls; }

  openCreateEventDialog(id, n, d, v, sd, ed, diw, st, et, tn, f, q, ql, mina, maxa, u) {
    this.dialog.open(CreateeventDialogComponent, {
      data: {
        newprogram_id: id,
        newprogram_name: n,
        newdistrict: d,
        newvenue: v,
        newstart_date: sd,
        newend_date: ed,
        newdayinweek: diw,
        newstart_time: st,
        newend_time: et,
        newtype_name: tn,
        newfee: f,
        newquota: q,
        newquota_left: ql,
        newmin_age: mina,
        newmax_age: maxa,
        newurl: u
      }
    });
  }

  openUpdateEventDialog(id, n, d, v, sd, ed, diw, st, et, tn, f, q, ql, mina, maxa, u) {
    this.dialog.open(UpdateeventDialogComponent, {
      data: {
        updateprogram_id: id,
        updateprogram_name: n,
        updatedistrict: d,
        updatevenue: v,
        updatestart_date: sd,
        updateend_date: ed,
        updatedayinweek: diw,
        updatestart_time: st,
        updateend_time: et,
        updatetype_name: tn,
        updatefee: f,
        updatequota: q,
        updatequota_left: ql,
        updatemin_age: mina,
        updatemax_age: maxa,
        updateurl: u
      }
    });
  }

  openRetrieveEventDialog(id, n, d, v, sd, ed, diw, st, et, tn, f, q, ql, mina, maxa, u) {
    this.dialog.open(RetrieveeventDialogComponent, {
      data: {
        newprogram_id: id,
        newprogram_name: n,
        newdistrict: d,
        newvenue: v,
        newstart_date: sd,
        newend_date: ed,
        newdayinweek: diw,
        newstart_time: st,
        newend_time: et,
        newtype_name: tn,
        newfee: f,
        newquota: q,
        newquota_left: ql,
        newmin_age: mina,
        newmax_age: maxa,
        newurl: u
      }
    });
  }

  openDeleteEventDialog(id, n, d, v, sd, ed, diw, st, et, tn, f, q, ql, mina, maxa, u) {
    this.dialog.open(DeleteeventDialogComponent, {
      data: {
        newprogram_id: id,
        newprogram_name: n,
        newdistrict: d,
        newvenue: v,
        newstart_date: sd,
        newend_date: ed,
        newdayinweek: diw,
        newstart_time: st,
        newend_time: et,
        newtype_name: tn,
        newfee: f,
        newquota: q,
        newquota_left: ql,
        newmin_age: mina,
        newmax_age: maxa,
        newurl: u
      }
    });
  }

  createEvent() {
    if (this.registerEventForm.invalid) {
      return;
  }
    const newEvent: Event = {
      program_id: this.registerEventForm.get('newProgramID').value,
      program_name: this.registerEventForm.get('newProgramName').value,
      district: this.registerEventForm.get('newDistrict').value,
      venue: this.registerEventForm.get('newVenue').value,
      start_date: this.registerEventForm.get('newStartdate').value,
      end_date: this.registerEventForm.get('newEnddate').value,
      dayinweek: this.registerEventForm.get('newDayinweek').value,
      start_time: this.registerEventForm.get('newStarttime').value,
      end_time: this.registerEventForm.get('newEndtime').value,
      type_name: this.registerEventForm.get('newTypename').value,
      fee: this.registerEventForm.get('newFee').value,
      quota: this.registerEventForm.get('newQuota').value,
      quota_left: this.registerEventForm.get('newQuotaleft').value,
      min_age: this.registerEventForm.get('newMinimumage').value,
      max_age: this.registerEventForm.get('newMaximumage').value,
      url: this.registerEventForm.get('newURL').value
    };
    console.log(newEvent);
      this.eventService.create(newEvent).subscribe((newinfo) => {
      console.log(newinfo);

      this.openCreateEventDialog(
      this.registerEventForm.get('newProgramID').value,
      this.registerEventForm.get('newProgramName').value,
      this.registerEventForm.get('newDistrict').value,
      this.registerEventForm.get('newVenue').value,
      this.registerEventForm.get('newStartdate').value,
      this.registerEventForm.get('newEnddate').value,
      this.registerEventForm.get('newDayinweek').value,
      this.registerEventForm.get('newStarttime').value,
      this.registerEventForm.get('newEndtime').value,
      this.registerEventForm.get('newTypename').value,
      this.registerEventForm.get('newFee').value,
      this.registerEventForm.get('newQuota').value,
      this.registerEventForm.get('newQuotaleft').value,
      this.registerEventForm.get('newMinimumage').value,
      this.registerEventForm.get('newMaximumage').value,
      this.registerEventForm.get('newURL').value
      );
    },

  error => {this.alert.showAlert('Event with this ID already exist!'); }
  );
  }

  updateEvent() {
    if (this.updateEventForm.invalid) {
      return;
  }
    const updateEvent: Event = {

          program_id: this.updateEventForm.get('updateProgramID').value,
          program_name: this.updateEventForm.get('updateProgramName').value,
          district: this.updateEventForm.get('updateDistrict').value,
          venue: this.updateEventForm.get('updateVenue').value,
          start_date: this.updateEventForm.get('updateStartdate').value,
          end_date: this.updateEventForm.get('updateEnddate').value,
          dayinweek: this.updateEventForm.get('updateDayinweek').value,
          start_time: this.updateEventForm.get('updateStarttime').value,
          end_time: this.updateEventForm.get('updateEndtime').value,
          type_name: this.updateEventForm.get('updateTypename').value,
          fee: this.updateEventForm.get('updateFee').value,
          quota: this.updateEventForm.get('updateQuota').value,
          quota_left: this.updateEventForm.get('updateQuotaleft').value,
          min_age: this.updateEventForm.get('updateMinimumage').value,
          max_age: this.updateEventForm.get('updateMaximumage').value,
          url: this.updateEventForm.get('updateURL').value
         };

         this.eventService.update(updateEvent).subscribe((event) => {
           if (event.error) {
            this.alert.showAlert('Event not found in database. Please Check!');
          } else {
              this.openUpdateEventDialog(
                this.updateEventForm.get('updateProgramID').value,
                this.updateEventForm.get('updateProgramName').value,
                this.updateEventForm.get('updateDistrict').value,
                this.updateEventForm.get('updateVenue').value,
                this.updateEventForm.get('updateStartdate').value,
                this.updateEventForm.get('updateEnddate').value,
                this.updateEventForm.get('updateDayinweek').value,
                this.updateEventForm.get('updateStarttime').value,
                this.updateEventForm.get('updateEndtime').value,
                this.updateEventForm.get('updateTypename').value,
                this.updateEventForm.get('updateFee').value,
                this.updateEventForm.get('updateQuota').value,
                this.updateEventForm.get('updateQuotaleft').value,
                this.updateEventForm.get('updateMinimumage').value,
                this.updateEventForm.get('updateMaximumage').value,
                this.updateEventForm.get('updateURL').value
              );
          }
        },
        error => {this.alert.showAlert('Error. Please Check!'); }
     );
  }
  getOneEvent() {
    if (this.getOneEventForm.invalid) {
      return;
  }
    this.eventService.getById(this.getOneEventForm.get('getOneProgramID').value).subscribe((event) => {
    //  if (this.getOneEventForm.get('getOneProgramID').value === '') {
    //    this.getOneEventOutput = 'Please enter something!';
       if (event == null) {
        {this.alert.showAlert('Event not found in database. Please Check!'); }
       } else {
        this.getOneEventOutput =
            'Program ID: ' + event['program_id'] + '/n' +
            'Program Name: ' + event['program_name'] + '/n' +
            'District: ' +  event['district'] + '/n' +
            'Venue: ' +  event['venue'] + '/n' +
            'Start Date: ' +  event['start_date'] + '/n' +
            'End Date: ' +   event['end_date'] + '/n' +
            'Day in week: ' +   event['dayinweek'] + '/n' +
            'Start Time: ' +   event['start_time'] + '/n' +
            'End Time: ' +   event['end_time'] + '/n' +
            'Type Name: ' +   event['type_name'] + '/n' +
            'Fee: ' +   event['fee'] + '/n' +
            'Quota: ' +   event['quota'] + '/n' +
            'Quota Left: ' +   event['quota_left'] + '/n' +
            'Minimum Age: ' +   event['min_age'] + '/n' +
            'Maximum Age: ' +  event['max_age'] + '/n' +
            'URL: ' +   event['url'];
     }

     this.openRetrieveEventDialog(
      event['program_id'],
      event['program_name'],
      event['district'],
      event['venue'],
      event['start_date'],
      event['end_date'],
      event['dayinweek'],
      event['start_time'],
      event['end_time'],
      event['type_name'],
      event['fee'],
      event['quota'],
      event['quota_left'],
      event['min_age'],
      event['max_age'],
      event['url']
     );

    },
    error => {this.alert.showAlert('Error. Please Check!'); }
    );
  }

  deleteOneEvent() {
    if (this.deleteOneEventForm.invalid) {
      return;
  }
    this.deleteOneEventOutput = '';
    this.eventService.delete(this.deleteOneEventForm.get('deleteOneProgramID').value).subscribe((event) => {
      console.log(event);
      this.deleteOneEventOutput = 'Event deleted!';

      this.openDeleteEventDialog(
        event['program_id'],
        event['program_name'],
        event['district'],
        event['venue'],
        event['start_date'],
        event['end_date'],
        event['dayinweek'],
        event['start_time'],
        event['end_time'],
        event['type_name'],
        event['fee'],
        event['quota'],
        event['quota_left'],
        event['min_age'],
        event['max_age'],
        event['url']
       );
    },
    error => {this.alert.showAlert('Event not found in database. Please Check!'); }
    );
  }
}

@Component({
  selector: 'app-createeventdialog',
  templateUrl: './createeventDialog.component.html',
})
export class CreateeventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateEventDialogData,
   public dialogRef: MatDialogRef<CreateeventDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-updateeventdialog',
  templateUrl: './updateeventDialog.component.html',
})
export class UpdateeventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UpdateEventDialogData,
   public dialogRef: MatDialogRef<UpdateeventDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-retrieveeventdialog',
  templateUrl: './retrieveeventDialog.component.html',
})
export class RetrieveeventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RetrieveEventDialogData,
   public dialogRef: MatDialogRef<RetrieveeventDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-deleteeventdialog',
  templateUrl: './deleteeventDialog.component.html',
})
export class DeleteeventDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteEventDialogData,
   public dialogRef: MatDialogRef<DeleteeventDialogComponent>
   ) {}

   closeDialog() {
    this.dialogRef.close();
  }
}
