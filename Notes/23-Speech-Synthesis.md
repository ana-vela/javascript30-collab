# Notes

### Loading voices

The code presented in the exercise didn't work for populating the voices list in Firefox.
- `speechSynthesis.addEventListener('voiceschanged', populateVoices);`
	is used for Chrome.
- `voices = speechSynthesis.getVoices();` on `DOMContentLoaded` event for FF.

### Resources

* [HTMLElement: change event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event "HTMLElement: change event - Web APIs | MDN")
* [SpeechSynthesis - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis "SpeechSynthesis - Web APIs | MDN")
  * [SpeechSynthesis: voiceschanged event - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event "SpeechSynthesis: voiceschanged event - Web APIs | MDN")
* [Function.prototype.bind() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind "Function.prototype.bind() - JavaScript | MDN")
