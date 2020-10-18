/* Get Our Elements */
let player = document.querySelector(".player");
let video = player.querySelector('.viewer');
let progress = player.querySelector('.progress');
let progressBar = player.querySelector('.progress__filled');
let toggle = player.querySelector('.toggle');
let skipButtons = player.querySelectorAll('[data-skip]');
let ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlayPause(){
    //Alternative way (Less readable)
    //const method = video.paused ? 'play' : 'pause';
    //video[method]();

    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

function updateToggleButton(){
    const icon = this.paused ? '►' : '❚ ❚' //Bound to video variable.
    toggle.textContent = icon;
}

function skipVideo(){
    // console.log(this.dataset.skip); //Returns data attributes (data-*)
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateRange(){
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress(){
    //updates the flex-basis (width);
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percentage}%`;
}

function scrubProgress(e){
    //Use offSetX to get location of the click.
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //offsetWidth gives a perecentage of the width of the bar.
    video.currentTime = scrubTime;
    // console.log(e);
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlayPause);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress); //Also progress event will do the same thing.

toggle.addEventListener('click', togglePlayPause);

skipButtons.forEach(btn => btn.addEventListener('click', skipVideo));

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange)); //Set a flag to update only when you click down.

let mousedown = false;

progress.addEventListener('click', scrubProgress);

// Alt way.
// progress.addEventListener('mousemove', () => {
//     if(mousedown){
//         scrubProgress();
//     }
// });

//Checks if the first variable is true, if it is, moves to the next variable. Otherwise, it is false.
progress.addEventListener('mousedown', (e) => mousedown && scrubProgress(e)); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//BONUS: Try to get fullscreen button to work.