// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';
import { paths } from './exercise-paths.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard(exPath, authorPath, authorName) {
	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Title
	const title = document.createElement('h3');
	title.textContent = exPath;
	card.appendChild(title);

	// Image
	const image = document.createElement('img');
	const imagePath = `./images/${authorName}/${authorName}-${exPath}.avif`;
	image.src = imagePath ?? './screenshot-sample.avif';
	card.appendChild(image);

	// Link
	const link = document.createElement('a');
	link.textContent = 'Demo';
	link.href = authorPath;
	card.appendChild(link);

	return card;
}

// Iterate over exercises and create cards for each of them
for (const exercise in paths) {
	const { ana, adrian } = paths[exercise];
	const cardAna = createCard(exercise, ana, 'Ana');
	const cardAdrian = createCard(exercise, adrian, 'Adrian');
	frag.append(cardAna, cardAdrian);
}

container.appendChild(frag);
document.body.appendChild(container);
