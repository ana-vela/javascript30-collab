// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';
import { paths } from './exercise-paths.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard(exerciseName, ana) {
	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Title
	const title = document.createElement('h3');
	title.textContent = exerciseName.replace(
		/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/,
		''
	);
	card.appendChild(title);

	// Image
	const image = document.createElement('img');
	image.src = './screenshot-sample.avif'; 
	card.appendChild(image);

	// Link
	const link = document.createElement('a');
	link.textContent = 'Demo';
	link.href = ana; 
	card.appendChild(link);

	return card;
}

// Iterate over exercises and create a card for each
for (const exercise in paths) {
	const { ana } = paths[exercise];
	const card = createCard(exercise, ana);
	frag.appendChild(card);
}

container.appendChild(frag);
document.body.appendChild(container);
