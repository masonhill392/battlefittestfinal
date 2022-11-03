
var powerlevel = 4.2;
var max_pushup = 1;
var max_situp = 1;
var max_squat = 1;
var powerlevel_pushup;
var powerlevel_situp;
var powerlevel_squat;
var difficulty = 0;
var bodyweight = 0;





console.log("battle.js connected");
console.log("battle.html displaying");



$("#buttonsubmit").click(function () {
    getinputstats();
});


function getinputstats() {
    if (upperinput == 0 || coreinput == 0 || lowerinput == 0) {
        console.log("Stats clicked, but there were missing fields")
    } else {
        max_pushup = $("#upperinput").val();
        max_situp = $("#coreinput").val();
        max_squat = $("#lowerinput").val();
        bodyweight = $("#weightinput").val();
        difficulty = $("#difficultyinput").val();
        $("#statinput").css("display", "none");
        calcpowerlevel();
        $("#battleui").css("display", "grid");
        consoleupdate_init();
    }
}


function calcpowerlevel() {
    powerlevel = ((max_pushup * 1.9) + (max_situp * 1.3) + (max_squat * 1.0) * bodyweight);
}


function consoleupdate_init() {
    console.log("upper input: " + max_pushup);
    console.log("core input: " + max_situp);
    console.log("lower input: " + max_squat);
    console.log("powerlevel : " + powerlevel);
    console.log("Stats calculated. Closing statinput.")
}
