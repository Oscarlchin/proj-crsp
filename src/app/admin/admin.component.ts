import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';
import { EventService } from '../_services';
import { Event } from '../_models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  registerForm: FormGroup;
  updateForm: FormGroup;
  getOneForm: FormGroup;
  deleteOneForm: FormGroup;

  createOutput = '';
  updateOutput = '';
  getOneOutput = '';
  deleteOneOutput = '';

  registerEventForm: FormGroup;
  updateEventForm: FormGroup;
  getOneEventForm: FormGroup;
  deleteOneEventForm: FormGroup;

  createEventOutput = '';
  updateEventOutput = '';
  getOneEventOutput = '';
  deleteOneEventOutput = '';


  constructor( private userService: UserService,
    private eventService: EventService,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      newUsername : '',
      newPassword : ''
    });

    this.updateForm = this.formbuilder.group({
      preUpdateUsername : '',
      updateNewUsername : '',
      updateNewPassword : ''
    });

    this.getOneForm = this.formbuilder.group({
      getOneUsername : ''
    });

    this.deleteOneForm = this.formbuilder.group({
      deleteOneUsername : ''
    });

    this.registerEventForm = this.formbuilder.group({
      newProgramID : '',
      newProgramName : '',
      newVenue : '',
      newDistrict : '',
      newStartdate : '',
      newEnddate : '',
      newDayinweek : '',
      newStarttime : '',
      newEndtime : '',
      newTypename : '',
      newFee : '',
      newQuota : '',
      newQuotaleft : '',
      newMinimumage : '',
      newMaximumage : '',
      newURL : ''
    });

    this.updateEventForm = this.formbuilder.group({
      preUpdateProgramID : '',
      updateProgramID : '',
      updateProgramName : '',
      updateVenue : '',
      updateDistrict : '',
      updateStartdate : '',
      updateEnddate : '',
      updateDayinweek : '',
      updateStarttime : '',
      updateEndtime : '',
      updateTypename : '',
      updateFee : '',
      updateQuota : '',
      updateQuotaleft : '',
      updateMinimumage : '',
      updateMaximumage : '',
      updateURL : ''
    });

    this.getOneEventForm = this.formbuilder.group({
      getOneProgramID : ''
    });

    this.deleteOneEventForm = this.formbuilder.group({
      deleteOneProgramID : ''
    });
  }

  createUser() {
    const newUser: User = {
//        username : 'oscar100',
//       password : 'oscar100',
      username : this.registerForm.get('newUsername').value,
      password : this.registerForm.get('newPassword').value,
      favevents : []
    };
    console.log(newUser);
    this.userService.create(newUser).subscribe((event) => {
      console.log(event);
      if (this.registerForm.get('newUsername').value === ''
      || this.registerForm.get('newPassword').value === '') {
        this.createOutput = 'Please enter something!';
       } else {
        this.createOutput = 'Username: ' + this.registerForm.get('newUsername').value + '/n'
          + 'Password: ' + this.registerForm.get('newPassword').value;
     }
    },
    error => {this.createOutput = 'Error. Please Check!'; }
    );
  }

  updateUser() {
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
          if (this.updateForm.get('preUpdateUsername').value === ''
          || this.updateForm.get('updateNewUsername').value === ''
          || this.updateForm.get('updateNewPassword').value === '') {
            this.updateOutput = 'Please enter something!';
          } else if (event == null) {
            this.updateOutput = 'User not found on database. Please Check!';
          } else {
            this.updateOutput = 'Updated Username: ' + event['username'] + '/n' + 'Updated Password: ' + event['password'];
         }
        },
        error => {this.updateOutput = 'Error. Please Check!'; }
         );
  }

  getOneUser() {
         this.userService.getByName(this.getOneForm.get('getOneUsername').value).subscribe((event) => {
           if (this.getOneForm.get('getOneUsername').value === '') {
             this.getOneOutput = 'Please enter something!';
            } else if (event == null) {
              this.getOneOutput = 'User not found on database. Please Check!';
            } else {
             this.getOneOutput = 'Username: ' + event['username'] + '/n' + 'Password: ' + event['password'] +
           '<br/> Favorite Event: ' + event['favevents'] + '<br/>';
          }
         },
         error => {this.getOneOutput = 'Error. Please Check!'; }
         );
  }

  deleteOneUser() {
    this.deleteOneOutput = ''; // reset to look better
    this.userService.delete(this.deleteOneForm.get('deleteOneUsername').value).subscribe((event) => {
      console.log(event);
      this.deleteOneOutput = 'User deleted!';
    },
    error => {this.deleteOneOutput = 'User not found on database. Please Check!'; }
    );
  }

  createEvent() {
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
    if (this.registerEventForm.get('newProgramID').value === ''
    || this.registerEventForm.get('newProgramName').value === ''
    || this.registerEventForm.get('newDistrict').value === ''
    || this.registerEventForm.get('newVenue').value === ''
     ) {
      this.createEventOutput = 'Please enter something!';
     } else {
      this.createEventOutput = 
      'Program ID: ' + this.registerEventForm.get('newProgramID').value + '/n'
      + 'Program Name: ' + this.registerEventForm.get('newProgramName').value + '/n'
      + 'District: ' + this.registerEventForm.get('newDistrict').value + '/n'
      + 'Venue: ' + this.registerEventForm.get('newVenue').value + '/n'
      + 'Start Date: ' + this.registerEventForm.get('newStartdate').value + '/n'
      + 'End Date: ' + this.registerEventForm.get('newEnddate').value + '/n'
      + 'Day in week: ' + this.registerEventForm.get('newDayinweek').value + '/n'
      + 'Start Time: ' + this.registerEventForm.get('newStarttime').value + '/n'
      + 'End Time: ' + this.registerEventForm.get('newEndtime').value + '/n'
      + 'Type Name: ' + this.registerEventForm.get('newTypename').value + '/n'
      + 'Fee: ' + this.registerEventForm.get('newFee').value + '/n'
      + 'Quota: ' + this.registerEventForm.get('newQuota').value + '/n'
      + 'Quota Left: ' + this.registerEventForm.get('newQuotaleft').value + '/n' 
      + 'URL: ' + this.registerEventForm.get('newURL').value;
      }
    },
  error => {this.createEventOutput = 'Error. Please Check!'; }
  );
  }

  updateEvent() {
    const updateEvent: Event ={
     
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

         this.eventService.update(this.updateEventForm.get('preUpdateProgramID').value, updateEvent).subscribe((event) => {
          if (this.updateEventForm.get('preUpdateProgramID').value === ''
          || this.updateEventForm.get('updateProgramID').value === ''
          || this.updateEventForm.get('updateProgramName').value === ''
          || this.updateEventForm.get('updateDistrict').value === ''
          || this.updateEventForm.get('updateVenue').value === '') {
            this.updateEventOutput = 'Please enter something!';
          } else if (event == null) {
            this.updateEventOutput = 'Event not found in database. Please Check!';
          } else {
            
            'Updated Program ID: ' + event['updateProgramID'] + '/n' +
            'Updated Program Name: ' + event['updateProgramName'] + '/n' +
            'Updated District: ' +  event['updateDistrict'] + '/n' +
            'Updated Venue: ' +  event['updateVenue'] + '/n' +
            'Updated Start Date: ' +  event['updateStartdate'] + '/n' +
            'Updated End Date: ' +   event['updateEnddate'] + '/n' +
            'Updated Day in week: ' +   event['updateDayinweek'] + '/n' +
            'Updated Start Time: ' +   event['updateStarttime'] + '/n' +
            'Updated End Time: ' +   event['updateEndtime'] + '/n' +
            'Updated Type Name: ' +   event['updateTypename'] + '/n' +
            'Updated Fee: ' +   event['updateFee'] + '/n' +
            'Updated Quota: ' +   event['updateQuota'] + '/n' +
            'Updated Quota Left: ' +   event['updateQuotaleft'] + '/n' +
            'Updated Minimum Age: ' +   event['updateMinimumage'] + '/n' +
            'Updated Maximum Age: ' +  event['updateMaximumage'] + '/n' +
            'Updated URL: ' +   event['updateURL'] 
         }
        },
        error => {this.updateEventOutput = 'Error. Please Check!'; }
         );     
  

  }
  getOneEvent() {
    this.eventService.getById(this.getOneEventForm.get('getOneProgramID').value).subscribe((event) => {
      if (this.getOneEventForm.get('getOneProgramID').value === '') {
        this.getOneEventOutput = 'Please enter something!';
       } else if (event == null) {
         this.getOneEventOutput = 'Event not found in database. Please Check!';
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
            'URL: ' +   event['url'] 
     }
    },
    error => {this.getOneEventOutput = 'Error. Please Check!'; }
    );
  }
  deleteOneEvent() {
    this.deleteOneEventOutput = ''; 
    this.eventService.delete(this.deleteOneEventForm.get('deleteOneProgramID').value).subscribe((event) => {
      console.log(event);
      this.deleteOneEventOutput = 'Event deleted!';
    },
    error => {this.deleteOneEventOutput = 'Event not found in database. Please Check!'; }
    );
  }
}
  
