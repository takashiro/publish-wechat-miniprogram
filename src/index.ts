import * as mp from 'miniprogram-ci';

import Project from './Project';

(async function main(): Promise<void> {
	const project = new Project();
	const version = project.getVersion();
	if (!version) {
		throw new Error('Please define a version.');
	}

	await mp.upload({
		project,
		version,
		// eslint-disable-next-line no-console
		onProgressUpdate: console.log,
	});
}());
