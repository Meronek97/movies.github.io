const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotNav = document.querySelector('.carousel__nav');
const dot = Array.from(dotNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//movie 
const contentTrack = document.querySelector('.content__track');
const movieSlides = Array.from(contentTrack.children);

const movieWidth = movieSlides[0].getBoundingClientRect().width;




// arange slides next to another

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// movie

const setMoviePosition = (movie, index) => {
    movie.style.left = movieWidth * index + 'px';
};
movieSlides.forEach(setMoviePosition);


const moveToMovie = (contentTrack, currentMovie, targetMovie) => {
    contentTrack.style.transform = 'translateX(-' + targetMovie.style.left + ')';
    currentMovie.classList.remove('current-movie');
    targetMovie.classList.add('current-movie')
};
// 

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide')
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
};


// move slide to left

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

    // movie

    const currentMovie = contentTrack.querySelector('.current-movie');
    const prevMovie = currentMovie.previousElementSibling;
    moveToMovie(contentTrack, currentMovie, prevMovie);

});

// move slide to right

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
    //movie

    const currentMovie = contentTrack.querySelector('.current-movie');
    const nextMovie = currentMovie.nextElementSibling;
    moveToMovie(contentTrack, currentMovie, nextMovie);
    //
});


// move slide to clicked slide nav

dotNav.addEventListener('click', e => {

    // what indicator was clicked
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotNav.querySelector('.current-slide');
    const targetIndex = dot.findIndex(dots => dots === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
    //movie

    const currentMovie = contentTrack.querySelector('.current-movie');
    const nextMovie = currentMovie.nextElementSibling;
    moveToMovie(contentTrack, currentMovie, nextMovie);
    //
});