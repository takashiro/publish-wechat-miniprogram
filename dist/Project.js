"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const core = require("@actions/core");
const miniprogram_ci_1 = require("miniprogram-ci");
class Project extends miniprogram_ci_1.Project {
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
                }
                else if (type === 'suffix') {
                    ignores.push(`*${value}`);
                }
                else if (type === 'prefix') {
                    ignores.push(`${value}*`);
                }
            }
        }
        super({
            appid,
            projectPath: '.',
            type: 'miniProgram',
            ignores,
        });
        if (fs.existsSync('package.json')) {
            const pkgContent = fs.readFileSync('package.json', 'utf-8');
            const pkg = JSON.parse(pkgContent);
            this.version = pkg.version;
            this.npmEnabled = true;
        }
        else {
            this.npmEnabled = false;
        }
    }
    getVersion() {
        return core.getInput('version') || this.version;
    }
    isNpmEnabled() {
        return this.npmEnabled;
    }
    // eslint-disable-next-line class-methods-use-this
    get privateKey() {
        return core.getInput('ssh-key');
    }
}
exports.default = Project;
