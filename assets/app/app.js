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
      firstTrainTime = "",
      frequency = 0,
      tillNextTrain = "",
      timetillNextTrain = "";

  //when you click on the submit button run this funciton
  $("#submit").on("click", function(event) {

      event.preventDefault();

      //reassign the train values with the input from inputs on the page
      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();

      //this is the first time of departure for the train
      firstTrainTime = $("#train-time").val().trim();

      //this is how long it takes for the train to arrive at it's destination
      frequency = $("#frequency").val().trim();

      //push the new train values to the database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
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

    var currentTime = moment(),

      convertedFirstTime = moment(snapshot.val().firstTrainTime, "hh:mm").subtract(1, "years"),

      timeDiff = moment().diff(moment(convertedFirstTime), "minutes"),

      remainingTime = timeDiff % snapshot.val().frequency,

      timeTillNextTrain = snapshot.val().frequency - remainingTime,

      tillNextTrain = moment().add(timeTillNextTrain, "minutes");

      console.log(timeTillNextTrain)
    //create new table row element
    var newRow = $("<tr>"),

        //create new table column elements and add values to them from the database
        trainCol = $("<td>").text(snapshot.val().trainName),
        destinationCol = $("<td>").text(snapshot.val().destination),
        frequencyCol = $("<td>").text(snapshot.val().frequency),
        nextArrival = $("<td>").text(moment(tillNextTrain).format("LLLL"));
        minAway = $("<td>").text(timeTillNextTrain);

        //appened the colums to the row
        newRow
        .append(trainCol)
        .append(destinationCol)
        .append(frequencyCol)
        .append(nextArrival)
        .append(minAway);

        //append the row which is now holding columns elements to the table
        $("#train-table").append(newRow);
  })