const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	// Get video feed from camera
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then(localMediaStream => {
			// console.log(localMediaStream);
			// Deprecated
			// video.src = window.URL.createObjectURL(localMediaStream);

			// set the feed as src and play it (otherwise it'll stay still)
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch(err => {
			console.error(`Error: ${err}`);
		});
}

function paintToCanvas() {
	const [width, height] = [video.videoWidth, video.videoHeight];
	canvas.width = width;
	canvas.height = height;

	// returning the Interval doesn't seem to mean that we can use clearInterval()
	// as stated in 11'45". The only way that seems to work is by specifying the interval
	// with its own ID outside the function so you can access and refer to it on the global scope
	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
	}, 160);
}

getVideo();
paintToCanvas();
