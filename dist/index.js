"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const core = require("@actions/core");
const mp = require("miniprogram-ci");
const Project_1 = require("./Project");
(async function main() {
    try {
        const project = new Project_1.default();
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
    }
    catch (error) {
        core.setFailed(error);
    }
}());
