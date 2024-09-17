#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import process from "node:process";



(() => {
    const __dirname = import.meta.dirname;
    const referencePath = path.resolve(__dirname, '../reference')

    fs.cpSync(referencePath, process.cwd(), {
        dereference: true,
        preserveTimestamps: false,
        recursive: true,
        force: false,
        errorOnExist: false,
    })

    console.log('files generated');
})();