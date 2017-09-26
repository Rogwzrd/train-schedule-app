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

  var trainName = "",
      destination = "",
      trainTime = "",
      frequency = 0;

  $("#submit").on("click", function(event) {

      event.preventDefault();

      trainName = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#train-time").val().trim();
      frequency = $("#frequency").val().trim();

      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
      });

      $("#train-name").empty();
      $("#destination").empty();
      $("#train-time").empty();
      $("#frequency").empty();
  })



  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    var newRow = $("<tr>"),
        newTrain = $("<td>").text(snapshot.val().trainName),
        newDestination = $("<td>").text(snapshot.val().destination),
        newTrainTime = $("<td>").text(snapshot.val().trainTime),
        newFrequency = $("<td>").text(snapshot.val().frequency);

        newRow
        .append(newTrain)
        .append(newDestination)
        .append(newTrainTime)
        .append(newFrequency);
        $("#train-table").append(newRow);
  })