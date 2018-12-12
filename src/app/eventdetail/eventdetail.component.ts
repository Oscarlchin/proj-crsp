import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UseractionService, AuthService, AlertService } from '../_services';
import { EventComment, Event, User, Comment } from '../_models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    if (this.commentForm.invalid) {
      return;
    }
    this.useractionservice.leavecomment( this.authservice.loginObject.username  , this.eventid , this.currentusercomment)
    .subscribe( data => {
      if (data.program_id) {
        this.comments = data.eventcomments;
        this.currentusercomment = '';
       }
    });
  }

  onclicklike() {
    if (this.isLike) {
      this.useractionservice.unlikeevent(this.authservice.loginObject.username, this.eventid).subscribe(data => {
        const eventid = this.eventid;
        const fav = this.authservice.loginObject.favevents.filter(function(value) {
          return Number(value) !== eventid;
        });
        this.authservice.loginObject.favevents = fav;
        this.isLike = false;
        this.alert.showAlert('Unliked:(');
      });

    } else {
      this.useractionservice.likeevent(this.authservice.loginObject.username, this.eventid).subscribe(data => {
        this.authservice.loginObject.favevents.push(this.eventid);
        this.isLike = true;
        this.alert.showAlert('Liked:)');
      });

    }

  }

}
