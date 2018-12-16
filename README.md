# ProjCrsp

 “How to” guideline of the project

    User:
    i.	Login with your username and password.
    ii.	All events will be displayed by default, you can search for your desired event by choosing a field (Name, type, etc.), then typing the keyword such as ‘Badminton’.
    iii.	You can click the event you want to know more about, it will then redirect you to another page in which the event details will be shown.
    iv.	In this page, you can see comments of other users. You can also add comments.
    v.	If you like the event, you can click the like button.
    vi.	Your liked events will appear in the tab my favourite events.
    vii.	When you’re done, simply click logout to end the session.
    
    Admin:
    i.	Click ‘Admin login’ to login into admin interface
    ii.	There will be four tabs, User CRUD, Event CRUD, Upload CSV and Flush.
    a.	To work with user data, click User CRUD tab, then click the tab with the corresponding CRUD operation you want to work with.
    b.	You will be asked to fill in a form for every operation. Every detail is required or else the form cannot be submitted.
    c.	Username and Password created must be within 4-20 characters.
    
    d.	To work with event data, click Event CRUD tab, then click the tab with the corresponding CRUD operation you want to work with.
    e.	You will be asked to fill in a form for every operation. Every detail is required or else the form cannot be submitted. Note that ‘Program ID’, ‘Fee’, ‘Quota’, ‘Quota Left’, ‘Minimum Age’ and ‘Maximum Age’ inputs must be numbers only.
    f.	All forms are straightforward except Update Event.
    -	You can only update an existing event, type the Program ID of the event you want to update.
    -	Then fill in the corresponding fields.
    g.	A CSV file for event data can be uploaded at the CSV file tab. Just click ‘Select File to Upload’ to upload a CSV file from your computer.
    
    h.	In the Flush tab, click reload to reload online dataset, this may take some time as there are thousands of data.
    
    iii.	Click ‘Logout’ to logout.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

# Package used

FE: Angular, Bootstrap, Angular Material
BE: nodejs, express, mongoose, body-parser, passport, passport-local, cors, bcrypt, multer, fast-csv


# Reference
  1. http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial
  2. https://medium.freecodecamp.org/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e
  3. http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
