#!/usr/bin/env node

import fs from "node:fs/promises";
import { getFolderTree } from "@lesnoypudge/utils";
import path from "node:path";


// type File = {
//     name: string;
//     data: Buffer;
// };
// type Folder<FileName = string> = {
//     name: FileName;
//     files: File[];
//     folders: Folder[];
// };

const __dirname = import.meta.dirname;

(() => {
    const referenceTree = getFolderTree('./reference');

    const traverse = (currentPath, tree, fileCb) => {
        tree.files.forEach((file) => {
            fileCb(currentPath, file);
        })

        tree.folders.forEach((folder) => {
            const newPath = path.join(currentPath, folder.name);
            traverse(newPath, folder, fileCb)
        })
    }

    traverse(__dirname, referenceTree, (currentPath, file) => {
        console.log(currentPath)
        fs.mkdir(currentPath, { recursive: true })
        fs.writeFile(path.join(currentPath, file.name), file.data)
    })
})();