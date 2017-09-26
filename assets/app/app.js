  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyDeiIj5LHDVS9n0mr0qAGJZu4_5S9BvvLo",
      authDomain: "mike-s-awesome-project.firebaseapp.com",
      databaseURL: "https://mike-s-awesome-project.firebaseio.com",
      projectId: "mike-s-awesome-project",
      storageBucket: "mike-s-awesome-project.appspot.com",
      messagingSenderId: "446038034983"
  };


  firebase.initializeApp(config);


  var database = firebase.database();

  //variables for holding the train values
  var trainName = "",
      destination = "",
      trainTime = "",
      frequency = "";
      tillNextTrain = null;


  //when you click on the submit button trun this funciton
  $("#submit").on("click", function(event) {

      event.preventDefault();

      var firstTime = momemnt(trainTime);

      //reassign the train values with the input from inputs on the page
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();

      //this is the first time of departure for the train
      // trainTime = $("#train-time").val().trim();

      //this is how long it takes for the train to arrive at it's destination
      frequency = $("#frequency").val().trim();

      //this line needs to be an updating value based on the trainTime and the frequency, calculate the time between the frequency of the trains arrival and its departure time, this number will change with every cycle of the duration
      // tillNextTrain = momemnt(trainTime) + momemnt()

      //push the tnew train values to the database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        tillNextTrain: tillNextTrain
      });

      //empty the input areas
      $("#train-name").empty();
      $("#destination").empty();
      $("#train-time").empty();
      $("#frequency").empty();
  })


  //when the pade loads or chrildren are added to the database this function runs
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    //create new table row element
    var newRow = $("<tr>"),

        //create new table column elements and add values to them from the database
        newTrain = $("<td>").text(snapshot.val().trainName),
        newDestination = $("<td>").text(snapshot.val().destination),
        newTrainTime = $("<td>").text(snapshot.val().trainTime),
        newFrequency = $("<td>").text(snapshot.val().frequency);
        newTillNextTrain = $("<td>").text(snapshot.val().tillNextTrain);

        //appened the colums to the row
        newRow
        .append(newTrain)
        .append(newDestination)
        .append(newTrainTime)
        .append(newFrequency),
        .append(newTillNextTrain);

        //append the row which is now holding columns elements to the table
        $("#train-table").append(newRow);
  })