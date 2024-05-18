#!/usr/bin/env node

import fs from "node:fs/promises";
import { getFolderTree } from "@lesnoypudge/utils";
import path from "node:path";



(() => {
    const __dirname = import.meta.dirname;
    const referencePath = path.resolve(__dirname, './reference')
    const referenceTree = getFolderTree(referencePath);

    const traverse = (currentPath, tree, fileCb) => {
        tree.files.forEach((file) => {
            fileCb(currentPath, file);
        })

        tree.folders.forEach((folder) => {
            const newPath = path.join(currentPath, folder.name);
            traverse(newPath, folder, fileCb)
        })
    }

    const executionPath = process.cwd();

    traverse(executionPath, referenceTree, (currentPath, file) => {
        fs.mkdir(currentPath, { recursive: true })
        fs.writeFile(path.join(currentPath, file.name), file.data)
    })
})();