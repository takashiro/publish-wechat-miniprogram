"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mp = require("miniprogram-ci");
const Project_1 = require("./Project");
(async function main() {
    const project = new Project_1.default();
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
