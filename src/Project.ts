import * as fs from 'fs';
import * as core from '@actions/core';
import { Project as IProject } from 'miniprogram-ci';

export default class Project extends IProject {
	protected version?: string;

	protected npmEnabled: boolean;

	constructor() {
		const content = fs.readFileSync('project.config.json', 'utf-8');
		const config = JSON.parse(content);

		const { appid } = config;

		const ignores = [];
		const { packOptions } = config;
		if (packOptions && Array.isArray(packOptions.ignore)) {
			for (const rule of packOptions.ignore) {
				if (!rule) {
					continue;
				}

				const { type, value } = rule;
				if (!type || !value) {
					continue;
				}

				if (type === 'file' || type === 'folder' || type === 'glob') {
					ignores.push(value);
				} else if (type === 'suffix') {
					ignores.push(`*${value}`);
				} else if (type === 'prefix') {
					ignores.push(`${value}*`);
				}
			}
		}

		super({
			appid,
			projectPath: '.',
			privateKeyPath: '/fake/key/path',
			type: 'miniProgram',
			ignores,
		});

		if (fs.existsSync('package.json')) {
			const pkgContent = fs.readFileSync('package.json', 'utf-8');
			const pkg = JSON.parse(pkgContent);
			this.version = pkg.version;
			this.npmEnabled = true;
		} else {
			this.npmEnabled = false;
		}
	}

	getVersion(): string | undefined {
		return core.getInput('version') || this.version;
	}

	isNpmEnabled(): boolean {
		return this.npmEnabled;
	}

	// eslint-disable-next-line class-methods-use-this
	get privateKey(): string {
		return core.getInput('ssh-key');
	}
}
