/* eslint-disable no-console */
import * as core from '@actions/core';
import * as mp from 'miniprogram-ci';

import Project from './Project';

(async function main(): Promise<void> {
	try {
		const project = new Project();
		const version = project.getVersion();
		if (!version) {
			core.setFailed('Please define a version.');
			return;
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
	} catch (error) {
		core.setFailed(error);
	}
}());
