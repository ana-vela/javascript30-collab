const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const photoButton = document.querySelector('#take-photo');

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

		// data: arr consisting of RGBA values for each pixel
		let pixels = ctx.getImageData(0, 0, width, height);

		// Apply filter
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		pixels = greenScreen(pixels);

		// Trick to show previous frames using transparency:
		// ctx.globalAlpha = 0.6;

		// Output image
		ctx.putImageData(pixels, 0, 0);
	}, 160);
}

function takePhoto() {
	// play sound
	snap.currentTime = 0;
	snap.play();
	// data out of the canvas and into a link
	const data = canvas.toDataURL('image/jpeg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.innerHTML = `<img src=${data} alt="Handsome man" />`;
	// add link to list start
	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
		pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
		// pixels.data[i + 3]; // alpha
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		// Take the nth pixel before/after the current one  and change its value
		pixels.data[i - 150] = pixels.data[i + 0]; // red
		pixels.data[i + 300] = pixels.data[i + 1]; // green
		pixels.data[i - 450] = pixels.data[i + 2]; // blue
		// pixels.data[i + 3]; // alpha
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};

	document.querySelectorAll('.rgb input').forEach(input => {
		levels[input.name] = input.value;
	});

	for (let i = 0; i < pixels.data.length; i = i + 4) {
		let red = pixels.data[i + 0];
		let green = pixels.data[i + 1];
		let blue = pixels.data[i + 2];
		let alpha = pixels.data[i + 3];

		if (
			red >= levels.rmin &&
			green >= levels.gmin &&
			blue >= levels.bmin &&
			red <= levels.rmax &&
			green <= levels.gmax &&
			blue <= levels.bmax
		) {
			// Take the pixel out if it's within the range
			pixels.data[i + 3] = 0;
		}
	}

	return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
// Add a proper listener for takePhoto instead of relying on onClick events
photoButton.addEventListener('click', takePhoto);
