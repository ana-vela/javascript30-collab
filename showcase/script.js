// can't import json directly as of yet, rely on .js or use fetch
// import data from './exercise-paths.json';

import {paths} from './exercise-paths.js';

console.log(paths);

const table = document.querySelector('table');
let frag = document.createDocumentFragment();

for (const exercise in paths) {
	// create a table row
	const row = document.createElement('tr');

	// td with exercise number and name
	const td = document.createElement('td');
	const exerciseName = paths[exercise]['ana'];
	td.textContent = exerciseName.replace(/^(\.\.\/ProjectFiles-(Adrian|Ana)\/)/, '');
	// row.appendChild(td);

	// td with link to Ana's exercise
	const td2 = document.createElement('td');
	const a = document.createElement('a');
	a.textContent = 'Demo';
	a.href = paths[exercise]['ana'];
	td2.appendChild(a);
	// row.appendChild(td2);

	// td with link to Adrian's exercise
	const td3 = document.createElement('td');
	const a2 = document.createElement('a');
	a2.textContent = 'Demo';
	a2.href = paths[exercise]['adrian'];
	td3.appendChild(a2);
	// row.appendChild(td3);

	row.append(td, td2, td3);

	frag.appendChild(row);
}
	
table.append(frag);