// Initialize Firebase
firebase.initializeApp(config);

// Create database reference
var database = firebase.database();

function validateFirstTimeInput(time) {
    var str = time;
    var patt = new RegExp("^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$");
    var res = patt.test(str);
    return res;
}

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Get user input 
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var firstStart = $("#first-time-input").val().trim();
    var freq = $("#freq-input").val().trim();
    var res = validateFirstTimeInput(firstStart);
   
    if (!res) {
        alert("First train time must be military time only");
    } else {
        // Creates local temp object for holding train data
        var train = {
            name: trainName,
            dest: dest,
            firstStartTime: firstStart,
            freq: freq
        };

        // Uploads obj to the database
        database.ref().push(train);

        alert("Train successfully added");

        //Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#first-time-input").val("");
        $("#freq-input").val("");

    }

});

database.ref().on("child_added", function (snap) {
    console.log(snap.val());

    var trainName = snap.val().name;
    var dest = snap.val().dest;
    var firstStart = snap.val().firstStartTime;
    var freq = snap.val().freq;


    //calculate when the next train is 
    //calulate how many minutes from now that is
    var firstTimeConverted = moment(firstStart, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % freq;

    var minutesUntilTrain = freq - tRemainder;

    var nextTrain = moment().add(minutesUntilTrain, "minutes");

    var nextTrainPretty = moment(nextTrain).format("hh:mm A");

    // Add to table
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(nextTrainPretty),
        $("<td>").text(minutesUntilTrain)
    );


    $("#train-table > tbody").append(newRow);
});