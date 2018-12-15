// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UseractionService, AuthService, AlertService } from '../_services';
import { Event, Comment } from '../_models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {
  commentForm: FormGroup;
  comments: Comment[] = [];
  event: Event = null;
  eventid: number;
  currentusercomment = '';
  isLike: boolean;
  isSubmit = false;
  constructor(  private route: ActivatedRoute,
    private router: Router,
    private useractionservice: UseractionService,
    private authservice: AuthService,
    private alert: AlertService
    ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'comment' : new FormControl([this.currentusercomment, [Validators.required] ])
    });

    this.route.params.subscribe(params => {
      this.eventid = Number(params.id);
      if (this.authservice.loginObject.favevents.includes(this.eventid)) {
        this.isLike = true;
      } else {
        this.isLike = false;
      }
      this.useractionservice.Event$.subscribe(data => {
        if (!data) { return; }
        for ( const e in data ) {
          if (data[e].program_id === Number(params.id)) {
            this.event = data[e];
            break;
          }
        }
      });
      this.useractionservice
        .getcomment(Number(params.id))
        .subscribe(data => {
          // console.log(data);
          if (data === null) {this.comments = []; }
          if (!data) {return; }
          this.comments = data.eventcomments;

        });
    });

    // console.log(this.eventid);
  }

  get formcomment() { return this.commentForm.get('comment'); }


  gotoevents() {
    this.router.navigate(['/home/eventslist']);
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.commentForm.invalid) {
      return;
    }
    this.useractionservice.leavecomment( this.authservice.loginObject.username  , this.eventid , this.currentusercomment)
    .subscribe( data => {
      if (data.program_id) {
        this.comments = data.eventcomments;
        this.currentusercomment = '';
        this.commentForm.markAsPristine();
        this.commentForm.markAsUntouched();
        this.isSubmit = false;
       }
    });
  }

  onclicklike() {
    if (this.isLike) {
      this.useractionservice.unlikeevent(this.authservice.loginObject.username, this.eventid).subscribe(data => {
        if (data.username) {
          this.authservice.loginObject.favevents =  data.favevents;
        this.isLike = false;
        this.alert.showAlert('Unliked:(');
      }
      });

    } else {
      this.useractionservice.likeevent(this.authservice.loginObject.username, this.eventid).subscribe(data => {
        if (data.username) {
        this.authservice.loginObject.favevents =  data.favevents;
        this.isLike = true;
        this.alert.showAlert('Liked:)');
        }
      });

    }

  }

}
