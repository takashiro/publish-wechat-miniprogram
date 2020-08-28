/* eslint-disable no-console */
import * as core from '@actions/core';
import * as mp from 'miniprogram-ci';

import Project from './Project';
import { stat } from 'fs';

(async function main(): Promise<void> {
	try {
		const project = new Project();
		const version = project.getVersion();
		if (!version) {
			core.setFailed('Please define a version.');
			return;
		}

		if (project.isNpmEnabled()) {
			console.log('Packing npm modules...');
			const warnings = await mp.packNpm(project);
			if (warnings.length > 0) {
				console.warn(warnings);
			}
		}

		console.log('Uploading...');
		await mp.upload({
			project,
			version,
			onProgressUpdate(progress) {
				if (typeof progress === 'string') {
					console.log(`--- ${progress} ---`);
				} else if (progress.status === 'doing') {
					console.log(`Processing ${progress.message}`);
				}
			},
		});
	} catch (error) {
		core.setFailed(error);
	}
}());
