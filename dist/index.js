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
                }
                else if (progress.status === 'doing') {
                    console.log(`Processing ${progress.message}`);
                }
            },
        });
    }
    catch (error) {
        core.setFailed(error);
    }
}());
