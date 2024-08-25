const fs = require('fs');
const path = require('path');

// Function to read all files in a directory recursively
const readFilesRecursively = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            readFilesRecursively(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
};

// Function to write the content of each file to a .txt file
const writeFilesContentToTxt = (files, outputFilePath) => {
    const writeStream = fs.createWriteStream(outputFilePath);

    files.forEach((file) => {
        const fileContent = fs.readFileSync(file, 'utf-8');
        writeStream.write(`\n--- Content of file: ${file} ---\n\n`);
        writeStream.write(fileContent);
        writeStream.write('\n');
    });

    writeStream.end();
};

// Main function
const main = () => {
    const srcFolderPath = path.join(__dirname, 'src');
    const outputFilePath = path.join(__dirname, 'all_code.txt');

    // Read all files in src folder and subfolders
    const files = readFilesRecursively(srcFolderPath);

    // Write content of all files to all_code.txt
    writeFilesContentToTxt(files, outputFilePath);

    console.log('All code has been written to all_code.txt');
};

main();
