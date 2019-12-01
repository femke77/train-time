var firebaseConfig = {
    apiKey: "AIzaSyDvjZfMlhV3jzu05gOeSFxY95vPnggD58s",
    authDomain: "train-time-c3b1a.firebaseapp.com",
    databaseURL: "https://train-time-c3b1a.firebaseio.com",
    projectId: "train-time-c3b1a",
    storageBucket: "train-time-c3b1a.appspot.com",
    messagingSenderId: "40276663912",
    appId: "1:40276663912:web:6e04cf6046bd53a79b65dd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create database reference
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Get user input 
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var firstStart = $("#first-time-input").val().trim();
    var freq = $("#freq-input").val().trim();

    // Creates local temp object for holding train data
    var train = {
        name: trainName,
        dest: dest,
        firstStartTime: firstStart,
        freq: freq
    };

    // Uploads obj to the database
    database.ref().push(train);

    console.log(train.name);
    console.log(train.dest);
    console.log("first start time:  " + train.firstStartTime);
    console.log("train freq: " + train.freq);

    alert("Train successfully added");

    //Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-time-input").val("");
    $("#freq-input").val("");

});

database.ref().on("child_added", function (snap) {
    console.log(snap.val());

    var trainName = snap.val().name;
    var dest = snap.val().dest;
    var firstStart = snap.val().firstStartTime;
    var freq = snap.val().freq;

    //console.log(trainName);
    //console.log(dest);
    //console.log("first start time: " +firstStart);
    //console.log("frequency : " + freq);

    //calculate when the next train is 
    //calulate how many minutes from now that is
    var firstTimeConverted = moment(firstStart, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freq;
    // console.log(tRemainder);

    var minutesUntilTrain = freq - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + minutesUntilTrain);
    
    var nextTrain = moment().add(minutesUntilTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 
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