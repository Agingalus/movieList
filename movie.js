function Movie(pMovie, pRating) {
    this.movie = pMovie;
    this.rating = Number(pRating);

    this.toString = function () {
 
        let movieTitleString = this.movie + "  &nbsp; &nbsp;";
        let movieRatingString = "";

        //set color based on if it is good or not
        //strong = gold, em = red
        if (this.rating > 2) {
            movieRatingString += "<strong>";
        }
        else {
            movieRatingString += "<em>";
        }

        let i = 1;
        for (i = 1; i <= this.rating; i++) {
            movieRatingString += "&#9733";  // add a star!
        }

        if (this.rating > 2) {
            movieRatingString += "</strong>";
        }
        else {
            movieRatingString += "</em>";
        }

        return (movieTitleString + movieRatingString);

    }; // end toString


    this.valid = function () {
        if (this.movie != "" && (Number.isInteger(this.rating) && this.rating > 0 && this.rating < 6)) {
            return true;
        } else {
            return false;
        }
    };
}