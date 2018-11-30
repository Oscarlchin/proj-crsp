var events = [
  { program_id: 40484679,
    program_name: "Aerobic Dance Training Course",
    district: "Kwai Tsing",
    venue: "Tsing Yi Southwest Sports Centre",
    start_date: "2018-12-03",
    end_date:"2019-01-21",
    dayinweek:"Mon,Wed (excl.24/12,26/12,31/12)",
    start_time:"18:00",
    end_time:"19:00",
    type_name:"Aerobic Dance",
    fee: 65,
    quota: 25,
    quota_left: 0,
    min_age: 14,
    max_age: 99,
    url: "https://www.lcsd.gov.hk/clpss/en/search/leisure/srchCommRecretSprtProgsDtls.do?programCode=40484679"
  },
  { program_id: 40484686,
    program_name: "Badminton Training Course",
    district: "Kwai Tsing",
    venue: "Tsing Yi Southwest Sports Centre",
    start_date: "2019-01-02",
    end_date:"2019-03-13",
    dayinweek:"Wed (excl.06/02)",
    start_time:"19:00",
    end_time:"21:00",
    type_name:"Badminton",
    fee: 118,
    quota: 24,
    quota_left: 24,
    min_age: 7,
    max_age: 99,
    url: "https://www.lcsd.gov.hk/clpss/en/search/leisure/srchCommRecretSprtProgsDtls.do?programCode=40484686"
  },
  { program_id: 40484743,
    program_name: "Children Dance Training Course",
    district: "Kwai Tsing",
    venue: "Tsing Yi Southwest Sports Centre",
    start_date: "2019-01-12",
    end_date:"2019-03-16",
    dayinweek:"Sat",
    start_time:"14:00",
    end_time:"16:00",
    type_name:"Children Dance",
    fee: 60,
    quota: 20,
    quota_left: 20,
    min_age: 4,
    max_age: 6,
    url: "https://www.lcsd.gov.hk/clpss/en/search/leisure/srchCommRecretSprtProgsDtls.do?programCode=40484743"
  },
  { program_id: 40485943,
    program_name: "Rugby TC (18+)",
    district: "Yuen Long",
    venue: "Tin Shui Wai Park(5-a-side Soccer Pitch)",
    start_date: "2019-01-08",
    end_date:"2019-03-19",
    dayinweek:"Tue (excl.05/02)",
    start_time:"20:00",
    end_time:"22:00",
    type_name:"Rugby",
    fee: 40,
    quota: 20,
    quota_left: 20,
    min_age: 18,
    max_age: 99,
    url:"https://www.lcsd.gov.hk/clpss/en/search/leisure/srchCommRecretSprtProgsDtls.do?programCode=40485943"
    },
]

var eventcomments = [
  {
    program_id: 1,
    comment: [{username:"ffff", content: "ffffuu"}, {username:"fdf", content: "ffffuu"}]
  },{
    program_id: 2,
    comment: [{username:"aaaa", content: "ffffuu"}, {username:"fcf", content: "ffffuu"}]
  },{
    program_id: 3,
    comment: [{username:"bbbb", content: "ffffuu"}, {username:"fbf", content: "ffffuu"}]
  },{
    program_id: 4,
    comment: [{username:"cccc", content: "ffffuu"}, {username:"faf", content: "ffffuu"}]
  }];

var users = {
  userone: {
    username: 'userone',
    password: '1234'
  },
  usertwo: {
    username: 'usertwo',
    password: '5678'
  },
  admin:{
    username: 'admin',
    password: 'admin'
  }
}

module.exports = {
  users: users,
  events: events,
  eventcomments: eventcomments
}
