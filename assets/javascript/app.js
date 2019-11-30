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

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // Grabs user input
    var empName = $("#train-name-input").val().trim();
    var empRole = $("#dest-input").val().trim();
    var empStart = moment($("#first-time-input").val().trim(), "HH:mm").format("X");
    var empRate = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var train = {
      name: trainName,
      dest: trainDest,
      firstStartTime: firstStartTime,
      freq: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(train);
  
    // Logs everything to console
    console.log(train.name);
    console.log(train.trainDest);
    console.log(train.firstStartTime);
    console.log(train.trainFreq);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-time-input").val("");
    $("#freq-input").val("");

  });