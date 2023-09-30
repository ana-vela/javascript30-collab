// can't import json directly as of yet, rely on .js or use fetch
import { paths } from './showcase-data.js';

const container = document.querySelector('.exercise-container');
let frag = document.createDocumentFragment();

function createCard({ exName, exPath, authors }) {
	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Project Name
	const project = document.createElement('h3');
	project.textContent = exName;
	card.appendChild(project);

	authors.forEach(author => {
		// Image
		const image = document.createElement('img');
		const imagePath = `./images/${author.authorName}/${author.authorName}-${exPath}.avif`;
		image.src = imagePath ?? './screenshot-sample.avif';
		card.appendChild(image);

		// Link
		const link = document.createElement('a');
		link.textContent = 'Demo';
		link.href = author.authorPath;
		card.appendChild(link);
	});

	return card;
}


// Iterate over exercises and create cards for each of them
for (const exercise in paths) {
	const { ana, adrian, project: exName } = paths[exercise];
	const authors = [
		{ authorPath: ana, authorName: 'ana' },
		{ authorPath: adrian, authorName: 'adrian' },
	];
	const card = createCard({ exName, exPath: exercise, authors });
	frag.append(card);
}



container.appendChild(frag);
document.body.appendChild(container);
