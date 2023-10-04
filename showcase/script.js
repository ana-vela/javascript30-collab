// can't import json directly as of yet, rely on .js or use fetch
import { paths } from './showcase-data.js';

const main = document.querySelector('main');
let frag = document.createDocumentFragment();

function createCard({ exName, exDesc, exPath, authors }) {
	const card = document.createElement('div');
	card.classList.add('exercise-card');

	// Project name
	const project = document.createElement('h3');
	project.textContent = exName;
	card.appendChild(project);

	// Project description
	const description = document.createElement('p');
	description.textContent = exDesc;
	card.appendChild(description);

	// Exercise container
	const container = document.createElement('div');
	container.classList.add('exercise-container');

	authors.forEach(author => {
		// Exercise
		const exercise = document.createElement('div');
		exercise.classList.add('exercise');

		// Image
		const image = document.createElement('img');
		const imagePath = `./images/${author.authorName}/${author.authorName}-${exPath}.avif`;
		image.src = imagePath ?? './screenshot-sample.avif';
		exercise.appendChild(image);

		// Link
		const link = document.createElement('a');
		// Capitalize author name
		const capName = author.authorName.charAt(0).toUpperCase() + author.authorName.slice(1);
		link.textContent = `${capName}'s demo`;
		link.href = author.authorPath;
		exercise.appendChild(link);


		container.appendChild(exercise);
	});

	card.appendChild(container);
	return card;
}


// Iterate over exercises and create cards for each of them
for (const exercise in paths) {
	const { ana, adrian, project: exName, description: exDesc } = paths[exercise];
	const authors = [
		{ authorPath: ana, authorName: 'ana' },
		{ authorPath: adrian, authorName: 'adrian' },
	];
	const card = createCard({ exName, exDesc, exPath: exercise, authors });
	frag.append(card);
}


main.appendChild(frag);
document.body.appendChild(main);
