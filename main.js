"use strict";
$(document).ready(function() {});
let userMovie = $("#title");
let userRating = $("#rating");
let movieArray = [];
//let theBtn = document.getElementById("btnAdd");
//theBtn.addEventListener("click", hi);
$("#btnAdd").click(hi);
userMovie.focus();

function hi() {
    let newOne = new Movie(userMovie.val(), userRating.val());
    if (newOne.valid()) {

        movieArray.push(newOne);
        userMovie.focus();
    } else {
        // alert user to error
        window.alert("Data Entry Error:  Movie title must not be empty and the rating must be an integer between 1 and 5 inclusive. Movie data can not be added.");
    }

    // per spec, always blank out selections.
    userMovie.val("");
    userRating.val("");

}
$("#btnShow").click(function() {
    movieArray.sort(function(a, b) { return b.rating - a.rating; });
    $("#printHere").text("");
    for (let i = 0; i < movieArray.length; i++) {
        $("#printHere").append("<li>" + movieArray[i].toString() + "</li>");
    }
})