"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mp = require("miniprogram-ci");
const Project_1 = require("./Project");
(async function main() {
    const project = new Project_1.default();
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
