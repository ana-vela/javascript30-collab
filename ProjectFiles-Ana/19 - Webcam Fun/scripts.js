const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
	navigator.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then((localMediaStream) => {
			console.log(localMediaStream);
			video.srcObject = localMediaStream;
			video.play();
		})
		.catch((err) => {
			console.error(`Oh no!!`, err);
		});
}
function paintToCanvas() {
	const width = video.videoWidth;
	const height = video.videoHeight;
	canvas.width = width;
	canvas.height = height;

	return setInterval(() => {
		ctx.drawImage(video, 0, 0, width, height);
		let pixels = ctx.getImageData(0, 0, width, height);
		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		pixels = greenScreen(pixels);
		// ctx.globalAlpha = 0.1;

		ctx.putImageData(pixels, 0, 0);
		// console.log(pixels);
	}, 16);
}

function takePhoto() {
	snap.currentTime = 0;
	snap.play();
	//take the data out of the canvas
	const data = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", "stunning");
	link.innerHTML = `<img src="${data}" alt="stunning pic"/>`;
	strip.insertBefore(link, strip.firstChild);
	console.log(data);
}

function redEffect(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 0] = pixels.data[i + 0] + 100; //red
		pixels.data[i + 1] = pixels.data[i + 1] + 20; //green
		pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
	}
	return pixels;
}

function rgbSplit(pixels) {
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i + 150] = pixels.data[i + 0]; //red
		pixels.data[i + 200] = pixels.data[i + 1]; //green
		pixels.data[i - 150] = pixels.data[i + 2]; //blue
	}
	return pixels;
}

function greenScreen(pixels) {
	const levels = {};
	console.log(levels);
	document.querySelectorAll(".rgb input").forEach((input) => {
		levels[input.name] = input.value;
	});
	for (i = 0; i < pixels.data.length; i = i + 4) {
		let red = pixels.data[1 + 0];
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
			pixels.data[i + 3] = 0;
		}
	}
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
