/* eslint-disable no-console */
import * as mp from 'miniprogram-ci';

import Project from './Project';

(async function main(): Promise<void> {
	const project = new Project();
	const version = project.getVersion();
	if (!version) {
		throw new Error('Please define a version.');
	}

	if (project.isNpmEnabled()) {
		const warnings = await mp.packNpm(project);
		if (warnings.length > 0) {
			console.warn(warnings);
		}
	}

	await mp.upload({
		project,
		version,
		onProgressUpdate: console.log,
	});
}());
