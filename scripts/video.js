var scope = {};

scope.updateBarInterval = null;
scope.isPlaying = false;
scope.leftTime = '0:00';
scope.currentTime = '0:00';

const elements = document.querySelectorAll("[mm-bind]");
const video = document.getElementById("video");
video.setAttribute("src", getVideoUrl('video'))

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const controllers = document.getElementById("controllers");
const bar = document.getElementById("bar");
const progress = document.getElementById("progress");

updateVariables();

function getVideoUrl(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function togglePlay() {
    if (video.paused) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        video.play()
        scope.isPlaying = true;
        scope.updateBarInterval = setInterval(() => { updateBar() }, 1000);

    } else {
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        video.pause()
        isPlaying = false;
        window.clearInterval(scope.updateBarInterval)
    }
}

function updateBar() {
    scope.leftTime = '-' + getTimeFormat(video.duration - video.currentTime);
    scope.currentTime = getTimeFormat(video.currentTime);

    if (!this.video.ended) {
        let size = video.currentTime * bar.offsetWidth / video.duration;
        progress.style.width = size + 'px';
    } else {
        progress.style.width = '0px';
        window.clearInterval(scope.updateBarInterval);
    }

    updateVariables();
}

function getTimeFormat(s) {
    let time = (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + Math.ceil(s);
    return time;
}

function setTime(event) {
    let e = event || window.event;
    let progress = e.offsetX;
    let size = bar.offsetWidth;
    let time = progress * parseInt(video.duration) / size;

    video.currentTime = time;
    updateBar();
}

function updateVariables() {
    elements.forEach(el => {
        let value = el.getAttribute("mm-bind");
        el.textContent = scope[value];
    });
}

function toggleControllers() {
    if(controllers.style.opacity == 1) {
        controllers.style.opacity = 0;
    } else {
        controllers.style.opacity = 1;
    }
}