function Movie(pMovie, pRating) {
    this.movie = pMovie;
    this.rating = pRating;

    this.toString = function() {
        return this.movie + "      " + this.rating;
    };

    this.valid = function() {
        if (this.movie != "" && (this.rating > 0 && this.rating < 6)) {
            return true;
        } else {
            return false;
        }
    };
}