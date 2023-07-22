// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';
import { paths } from './exercise-paths.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard(exPath, authorPath, authorName, projectName) {
	let exerciseName = authorPath.replace(/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/, '');
	console.log(exerciseName);

	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Title
	const title = document.createElement('h3');
	title.textContent = exPath;
	card.appendChild(title);

	// Project Name
	const project = document.createElement('p'); // paragraph or header?
	project.textContent = projectName;
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
	const { ana, adrian, project } = paths[exercise];
	const cardAna = createCard(exercise, ana, 'ana', project);
	const cardAdrian = createCard(exercise, adrian, 'adrian', project);
	frag.append(cardAna, cardAdrian);
}

container.appendChild(frag);
document.body.appendChild(container);
