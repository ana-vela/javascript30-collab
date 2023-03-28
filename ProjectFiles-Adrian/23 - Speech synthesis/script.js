const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
// `options` -> both sliders + textarea
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
// textarea content to msg
msg.text = document.querySelector('[name="text"]').value;

// Populate `voicesDropdown` with voices available on the system
function populateVoices() {
	// voices = this.getVoices();
	voicesDropdown.innerHTML = voices
		.filter(voice => voice.lang.includes('en') || voice.lang.includes('es'))
		.map(
			voice =>
				`<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
		)
		.join('');
}

// Set voice
function setVoice() {
	msg.voice = voices.find(voice => voice.name === this.value);
	toggle();
}

// Restart
function toggle(startOver = true) {
	speechSynthesis.cancel();
	if (startOver) {
		speechSynthesis.speak(msg);
	}
}

// Update msg options
function setOption() {
	// eg: msg.pitch = 0.8, or msg.text = input;
	msg[this.name] = this.value;
	toggle();
}

// Speak
speakButton.addEventListener('click', toggle);
// Stop
// stopButton.addEventListener('click', toggle.bind(null, false));
stopButton.addEventListener('click', () => toggle(false));

// This won't trigger on page load in Firefox but is needed for Chrome
speechSynthesis.addEventListener('voiceschanged', populateVoices);
// Get and populate voices in Firefox
document.addEventListener('DOMContentLoaded', () => {
	voices = speechSynthesis.getVoices();
	populateVoices();
});

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
