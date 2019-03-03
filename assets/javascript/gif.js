$(function(){

    var animalName = ""
    var animals = ["Border Collie", "Corgi", "Golden Retriever", "Poodle", "Maltese", "Labrador", "German Shepherd", "Chihuahua", "Beagle"];

    function renderButtons() {
        $("#button-container").empty();
        for (i=0; i<animals.length; i++){
            var animalButton = $("<button>").text(animals[i]).addClass("btn btn-secondary").attr("data-name", animals[i]);
            $("#button-container").append(animalButton);
        }
    }
   
    
    
    var animate = function(){
        console.log("click");
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    }
  

     $("#add-animal").on("click", function(event){
         console.log("click");
         event.preventDefault();
         var newAnimal = $("#animal-input").val().trim();
         animals.push(newAnimal);
         renderButtons();
     });
     renderButtons();

    var displayGifs = function(){
        console.log("click");
        event.preventDefault();
        $("#gif-container").empty();
        var animalName = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animalName+"&api_key=DDDokA4S6mW4zAa8bE3L9StXtE63qtSw&limit=16&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response.data);
            var results=response.data;
            for (i=0; i<results.length; i++){

                var gifDiv = $("<div>").addClass("gif");
                var rating = results[i].rating;
                console.log(rating);
                var pOne = $("<p>").text("Rating: " + rating);
                gifDiv.append(pOne);
                var image = $("<img>").attr("src", results[i].images.fixed_width_still.url).attr("data-still", results[i].images.fixed_width_still.url).attr("data-state", "still").attr("data-animate", results[i].images.fixed_width.url).addClass("clickable");
                gifDiv.append(image);
                $("#gif-container").append(gifDiv);
            }
        });    
    }

    $(document).on("click", ".btn", displayGifs);

    $(document).on("click", ".clickable", animate);

    
});

