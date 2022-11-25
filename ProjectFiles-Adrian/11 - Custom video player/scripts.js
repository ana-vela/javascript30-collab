// Get elements

const player = document.querySelector('.player'),
	video = player.querySelector('.viewer'),
	progress = player.querySelector('.progress'),
	progressBar = player.querySelector('.progress__filled'),
	toggle = player.querySelector('.toggle'),
	skipButtons = player.querySelectorAll('[data-skip]'),
	ranges = player.querySelectorAll('.player__slider');

// Build functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButtonStats() {
	const icon = this.paused ? '▶' : '❚❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}


// Hook up listeners
video.addEventListener('play', updateButtonStats);
video.addEventListener('pause', updateButtonStats);
video.addEventListener('timeupdate', handleProgress);
[video, toggle].forEach(el => el.addEventListener('click', togglePlay));
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
