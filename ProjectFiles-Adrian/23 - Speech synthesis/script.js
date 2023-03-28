const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
// `options` -> both sliders + `textarea`
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const pasteClipboard = document.querySelector('#paste');

// `textarea` content to msg
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

// Speak & stop
speakButton.addEventListener('click', toggle);
// stopButton.addEventListener('click', toggle.bind(null, false));
stopButton.addEventListener('click', () => toggle(false));


// Populate voices in Chrome; this won't trigger on page load in Firefox 
speechSynthesis.addEventListener('voiceschanged', populateVoices);
// Get and populate voices in Firefox
document.addEventListener('DOMContentLoaded', () => {
	voices = speechSynthesis.getVoices();
	populateVoices();
});

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

// Replace input for clipboard content on pasteClipboard click
pasteClipboard.addEventListener('click', () => {
	if (navigator.clipboard.readText) {
		navigator.clipboard
			.readText()
			.then(clipText => {
				options[2].value = clipText;
				// options[2].textContent = clipText;
				setOption.bind(options[2])();
			})
			.catch(err => {
				console.error('Failed to read clipboard contents: ', err);
			});
	} else {
		console.error('Method .readText() of the Clipboard API not supported');
		console.log(
			"Already tried document.execCommand() but its deprecated and doesn't work either"
		);
		return;
	}
});
