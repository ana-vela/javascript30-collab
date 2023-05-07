let countDownInterval;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	// Clear any previous timer
	clearInterval(countDownInterval);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countDownInterval = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// logs -0 if you don't specify = too. ¯\_(ツ)_/¯
		if (secondsLeft <= 0) {
			clearInterval(countDownInterval);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(secs) {
	const minutes = Math.floor(secs / 60);
	const remainderSecs = secs % 60;
	// const display = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
	const display = `${minutes}:${String(remainderSecs).padStart(2, '0')}`;
	timerDisplay.textContent = display;
	document.title = `Timer: ${display}`;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	// const americanHour = hour > 12 ? hour - 12 : hour;
	//
	const americanHour = end.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});
	// endTimeDisplay.textContent = `Be back at: ${hour}:${minutes < 10 ? '0' : ''}${minutes} (${americanHour}:${minutes < 10 ? '0' : ''}${minutes})`;
	// endTimeDisplay.textContent = `Be back at: ${hour}:${String(minutes).padStart(2, '0')} (${americanHour}:${String(minutes).padStart(2, '0')})`;

	const formattedHour = String(hour).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	endTimeDisplay.textContent = `Be back at: ${formattedHour}:${formattedMinutes} (${americanHour})`;
}

function startTimer() {
	const secs = this.dataset.time;
	timer(secs);
}

timerButtons.forEach(button => button.addEventListener('click', startTimer));
document.querySelector('form[name="customForm"]').addEventListener('submit', function (e) {
	e.preventDefault();
	const mins = this.minutes.value;
	this.reset();
	timer(mins * 60);
});
