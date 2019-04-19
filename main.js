"use strictt";
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
        userMovie.val("");
        userRating.val("");
        userMovie.focus();
    } else {
        alert("The data was not good.");
    }
}
$("#btnShow").click(function() {
    movieArray.sort(function(a, b) { return a.rating - b.rating; });
    $("#printHere").text("");
    for (let i = 0; i < movieArray.length; i++) {
        $("#printHere").append("<li>" + movieArray[i].toString() + "</li>");
    }
})