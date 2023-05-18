// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';

import {paths} from './exercise-paths.js';

// console.log(paths);

const table = document.querySelector('table');
let frag = document.createDocumentFragment();

for (const exercise in paths) {
	// create a table row
	const row = document.createElement('tr');

	// td with exercise number and name
	const td = document.createElement('td');
	const exerciseName = paths[exercise]['ana'];
	td.textContent = exerciseName.replace(/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/, '');

	// td with link to Ana's exercise
	const td2 = document.createElement('td');
	const a = document.createElement('a');
	a.textContent = 'Demo';
	a.href = paths[exercise]['ana'];
	td2.appendChild(a);

	// td with link to Adrian's exercise
	const td3 = document.createElement('td');
	const a2 = document.createElement('a');
	a2.textContent = 'Demo';
	a2.href = paths[exercise]['adrian'];
	td3.appendChild(a2);

	row.append(td, td2, td3);
	
	// Add notes if present
	if (paths[exercise]['notes']) {
		const td4 = document.createElement('td');
		const a3 = document.createElement('a');
		a3.textContent = 'Notes';
		a3.href = paths[exercise]['notes'];
		td4.appendChild(a3);

		row.appendChild(td4);
	}

	// Add content to row and fragment
	frag.appendChild(row);
}
	
table.append(frag);