const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const barNav = document.querySelector('.carousel-nav');
const bars = Array.from(barNav.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateBar = (currentBar, targetBar) => {
    currentBar.classList.remove('current-indicator');
    targetBar.classList.add('current-indicator');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex===0){
        prevButton.classList.add('hidden');
        nextButton.classList.remove('hidden');
    } else if(targetIndex===slides.length - 1){
        prevButton.classList.remove('hidden');
        nextButton.classList.add('hidden');
    }
    else{
        prevButton.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentBar = barNav.querySelector('.current-indicator');
    const prevBar = currentBar.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide)
    moveToSlide(track, currentSlide, prevSlide);
    updateBar(currentBar, prevBar);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentBar = barNav.querySelector('.current-indicator');
    const nextBar = currentBar.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateBar(currentBar, nextBar);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

barNav.addEventListener('click', e => {
    const targetBar = e.target.closest('button');
    if(!targetBar) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentBar = barNav.querySelector('.current-indicator');
    const targetIndex = bars.findIndex(bar => bar === targetBar);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateBar(currentBar, targetBar);
    hideShowArrows(slides, prevButton, nextButton, targetIndex); 
})

