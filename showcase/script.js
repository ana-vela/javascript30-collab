// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';

import {paths} from './exercise-paths.js';

// console.log(paths);

const table = document.querySelector('table');
let frag = document.createDocumentFragment();


function createTdLink(name, href) {
	const td = document.createElement('td');
	const a = document.createElement('a');
	a.textContent = name;
	a.href = href;
	td.appendChild(a);
	return td;
} 

// Iterate over exercises and create a table row for each
for (const exercise in paths) {
	// create a table row
	const row = document.createElement('tr');

	// td with exercise number and name
	const td = document.createElement('td');
	const exerciseName = paths[exercise]['ana'];
	td.textContent = exerciseName.replace(/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/, '');

	// td with link to Ana's exercise
	const tdAna = createTdLink('Demo', paths[exercise]['ana']);
	td.appendChild(tdAna);

	// td with link to Adrian's exercise
	const tdAdrian = createTdLink('Demo', paths[exercise]['adrian']);
	td.appendChild(tdAdrian);


	row.append(td, tdAna, tdAdrian);
	
	// Add notes if present
	if (paths[exercise]['notes']) {
		const tdNotes = createTdLink('Notes', paths[exercise]['notes']);
		row.appendChild(tdNotes);
	}

	// Add content to row and fragment
	frag.appendChild(row);
}
	
table.append(frag);