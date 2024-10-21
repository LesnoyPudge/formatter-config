#!/usr/bin/env node
import path from "node:path";
import fs from "node:fs";
import process from "node:process";



type File = {
    name: string;
    data: string;
}

const untransferableFiles: File[] = [
    {
        name: '.gitignore',
        data: [
            'node_modules', 
            'dist', 
            'build',
            'package-lock.json',
            '.env',
        ].join('\n'),
    }
];

(() => {
    const __dirname = import.meta.dirname;
    const referencePath = path.resolve(__dirname, '../reference')
    const executionPath = process.cwd();
    let fileCount = 0;

    fs.cpSync(referencePath, executionPath, {
        dereference: true,
        preserveTimestamps: false,
        recursive: true,
        force: false,
        errorOnExist: false,
    })
    
    untransferableFiles.forEach((file) => {
        const filePath = path.join(executionPath, file.name);
        if (fs.existsSync(filePath)) return;

        fs.writeFileSync(filePath, file.data, {encoding: 'utf-8'})
        fileCount++;
    })

    console.log(`generated: ${fileCount} file(s)`);
})();