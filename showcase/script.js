// can't import json directly as of yet, rely on .js or use fetch
import { paths } from './showcase-data.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard({ exName, exPath, authorPath, authorName }) {
	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Project Name
	const project = document.createElement('h3');
	project.textContent = exName;
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
	const { ana, adrian, project: exName } = paths[exercise];
	const cardAna = createCard({ exName, exPath: exercise, authorPath: ana, authorName: 'ana' });
	const cardAdrian = createCard({ exName, exPath: exercise, authorPath: adrian, authorName: 'adrian' });
	frag.append(cardAna, cardAdrian);
}


container.appendChild(frag);
document.body.appendChild(container);
