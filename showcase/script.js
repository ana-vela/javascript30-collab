// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';
import { paths } from './exercise-paths.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard(exPath, authorPath, authorName) {
	
	const card = document.createElement('div');
	card.classList.add('exercise-card');
	
	// Project Name
	const exerciseName = authorPath.replace(/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/, '');
	const project = document.createElement('h3');
	project.textContent = exerciseName;
	card.appendChild(project);

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
	const cardAna = createCard(exercise, ana, 'ana');
	const cardAdrian = createCard(exercise, adrian, 'adrian');
	frag.append(cardAna, cardAdrian);
}

container.appendChild(frag);
document.body.appendChild(container);
