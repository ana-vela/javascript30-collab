// Get elements

const player = document.querySelector('.player'),
	video = player.querySelector('.viewer'),
	progress = player.querySelector('.progress'),
	progressBar = player.querySelector('.progress__filled'),
	toggle = player.querySelector('.toggle'),
	fsButton = player.querySelector('.fullscreen'),
	muteButton = player.querySelector('.mute'),
	skipButtons = player.querySelectorAll('[data-skip]'),
	ranges = player.querySelectorAll('.player__slider');

// Build functions

function updateButtonStats() {
	const icon = this.paused ? '▶' : '❚❚';
	toggle.textContent = icon;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

// https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen#requesting_fullscreen_mode
function toggleFullscreen() {
	if (!document.fullscreenElement) {
		video.requestFullscreen().catch(err => {
			alert(
				`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
			);
		});
	} else {
		document.exitFullscreen();
	}
}

function toggleVolume() {
	if (!video.muted) {
		video.muted = true;
		muteButton.textContent = "\uD83D\uDD0A";
	} else {
		video.muted = false;
		muteButton.textContent = '\uD83D\uDD07';
	}
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	if (!handleRangeMouseDown) return;
	video[this.name] = this.value;
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
fsButton.addEventListener('click', toggleFullscreen);
muteButton.addEventListener('click', toggleVolume);

// Flag behavior as in Canvas' exercise (see return on function)
let handleRangeMouseDown = false;
ranges.forEach(range => {
	range.addEventListener('change', handleRangeUpdate);
	range.addEventListener('mousemove', handleRangeUpdate);
	range.addEventListener('mousedown', () => (handleRangeMouseDown = true));
	range.addEventListener('mouseup', () => (handleRangeMouseDown = false));
});

// Flag behavior w/o altering the function itself
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
