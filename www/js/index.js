var app = new Framework7({
  // App root element
  el: '#app',
  routes: [
    {
      path: '/battle/',
      url: 'battle.html',
    },

  ],
  // ... other parameters
});



var mainView = app.views.create('.view-main');
var userhealth = 0;
var powerlevel = 0;
var max_pushup = 35;
var max_situp = 37;
var max_squat = 90;
var difficulty = 1;
var bodyweight = 177;
var enemyhealthremaining = 0;//decimal value works in CSS, dont use %
var whosturn = 2;
var attackclicked = 0;
var reps = 0;
var damage = 0;
var upperclicked = 0;
var coreclicked = 0;
var lowerclicked = 0;
var enemydamage = 0;
var upperset = 1.0;
var coreset = 1.0;
var lowerset = 1.0;
console.log("showing intro");




$("#intro-button").click(function () {//APP BEGINNING SEQUENCE, DISCLAIMER
  console.log("showing disclaimer");
  $("#intro-title").css("display", "none");
  $("#disclaimertext").css("display", "inline");
  $("#intro-button").css("display", "none");
  $("#enter-app").css("display", "inline");
});


$("#enter-app").click(function () {//LOADING BATTLE PAGE
  console.log("loading battle.html")
});



//
// battle js
//
var $$ = Dom7;
$$(document).on('page:init', function (e) {
  // run some code for when any page loads!
  console.log("battle.js connected");
  console.log("battle.html displaying");
});
$$(document).on('page:init', '.page[data-name="battle"]', function (e) {
  $("#buttonsubmit").click(function () {//GRAB USER INPUTS FOR MAXIMUM VALUES
    setup();
  });

  $("#upperbutton").click(function () {//upper
    if (attackclicked == 0) {
      attackclicked = 1;
      upperclicked = 1;
      console.log("upper selected");
      hideallprompt();
      $("#repprompt").css("display", "inline");
        console.log("Input your reps");
      $("#repinputsec").css("display", "inline");//Rep input not displaying. Get Frame7 thing for entire input slot, try that
    }
  });
  $("#corebutton").click(function () {//core
    if (attackclicked == 0) {
      attackclicked = 1;
      coreclicked = 1;
      console.log("core selected");
      hideallprompt();
      $("#repprompt").css("display", "inline");
        console.log("Input your reps");
      $("#repinputsec").css("display", "inline");//Rep input not displaying. Get Frame7 thing for entire input slot, try that
    }
  });
  $("#lowerbutton").click(function () {//lower
    if (attackclicked == 0) {
      attackclicked = 1;
      lowerclicked = 1;
      console.log("lower selected");
      hideallprompt();
      $("#repprompt").css("display", "inline");
        console.log("Input your reps");
      $("#repinputsec").css("display", "inline");//Rep input not displaying. Get Frame7 thing for entire input slot, try that
    }
  });




$("#repinputbutton").click(function() {
  reps = $("#repinput").val()
  $("#repinputsec").css("display", "none");

  if (upperclicked == 1) {
    damage = Math.floor((upperset*(reps*(powerlevel*.01)))*difficulty/((max_pushup*.70)*10));
    upperset = upperset + 0.15;
    upperclicked = 0;
  }
  if (coreclicked == 1) {
    damage = Math.floor((coreset*(reps*(powerlevel*.01)))*difficulty/((max_situp*.70)*10));
    coreset = coreset + 0.15;
    coreclicked = 0;
  }
  if (lowerclicked == 1) {
    damage = Math.floor((lowerset*(reps*(powerlevel*.01)))*difficulty/((max_squat*.70)*10));
    lowerset = lowerset + 0.15;
    coreclicked = 0;
  }

  enemyhealth = enemyhealth - damage;
  console.log("player deals " + damage + " damage!");
  roundupdate();
  enemyturn();
});
  



  

function enemyturn() {
  enemydamage = Math.floor(((Math.random() * 30)/difficulty) +5);
  console.log("enemy deals " + enemydamage + " damage!");
  userhealth = userhealth - enemydamage
  attackclicked = 0;
  $("#update").html("Enemy has dealt ", enemydamage);
  roundupdate();
  deathcheck();
}


  //                                        ---=== SETUP ===--- 
  function setup() {
    console.log("running setup");
    if (upperinput == 0 || coreinput == 0 || lowerinput == 0) {
      console.log("Stats clicked, but there were missing fields")
    } else {
      grabinputs();
      calclevels();
      initializegui();
      // startbattle();
    }
  }
  function grabinputs() {
    max_pushup = $("#upperinput").val();
    max_situp = $("#coreinput").val();
    max_squat = $("#lowerinput").val();
    bodyweight = $("#weightinput").val();
    difficulty = $("#difficultyinput").val();
    $("#statinput").css("display", "none");
  }
  function calclevels() {
    powerlevel = ((max_pushup * 1.9) + (max_situp * 1.3) + (max_squat * 1.0) * bodyweight);
    userhealth = Math.round((powerlevel / 100) * difficulty);
    userhealthdenominator = userhealth;
    enemyhealth = Math.round(userhealth / difficulty);
    enemyhealthdenominator = enemyhealth;
  }

  function roundupdate() {
    $("#userhealthdisplay").html(userhealth + "/" + userhealthdenominator);
    $("#enemyhealthdisplay").html(enemyhealth + "/" + enemyhealthdenominator);
    // updatehealthbars();
    enemyhealthremaining = (enemyhealth / enemyhealthdenominator) * 10;
    whosturn == 1;
    
  }
  function initializegui() {
    console.log("Powerlevel | " + powerlevel + " = " + max_pushup + " + " + max_situp + " + " + max_squat);
    $("#battledisplay").css("display", "inline");
    roundupdate();
    console.log("Stats calculated. Closing statinput.")
    $("#battleui").css("display", "grid");
    $("#pickmoveprompt").css("display", "inline");
  }












 function deathcheck() {//Is anybody dead? Who?
    if (userhealth <= 0 || enemyhealth <= 0) {
      if (userhealth <= 0) {//If you dead, then
        console.log("YOU DIED");
        $("#battleui").css("display", "none");
        $("#repprompt").css("display", "none");
        $("#userdeadprompt").css("display", "inline");
        $("#buttonyes").html("retry");
        $("#buttonno").html("quit");
        $("#ynbuttons").css("display", "inline");
      } else {//If enemy dead, then
        console.log("ENEMY DIED");
        $("#battleui").css("display", "none");
        $("#repprompt").css("display", "none");
        $("#enemydeadprompt").css("display", "inline");
        $("#buttonyes").html("retry");
        $("#buttonno").html("quit");
        $("#ynbuttons").css("display", "inline");
      }
    }else{
      hideallprompt() ;
      $("#pickmoveprompt").css("display", "inline");
    }
 }
 







function showynbuttons() {
  $("#ynbuttons").css("display", "inline");
}

function hideallprompt() {
  $("#userdead").css("display", "none");
  $("#enemydead").css("display", "none");
  $("#ynbuttons").css("display", "none");
  $("#lowerprompt").css("display", "none");
  $("#coreprompt").css("display", "none");
  $("#upperprompt").css("display", "none");
  $("#pickmoveprompt").css("display", "none");
}


});

//DO NOT PUT ANYTHING PAST THIS ------------==============----------
