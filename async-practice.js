// File thực hành async/await, fs, path, Promise.all

const fs = require('fs').promises;
const path = require('path');

function readFileCallback() {
    const fsOld = require('fs');

    fsOld.readFile('test.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('Lỗi callback:', err);
            return;
        }
        console.log('Callback data:', data);
    });
}
function readFilePromise() {
    return fs.readFile('test.txt', 'utf8');
}
async function readFileAsync() {
    try {
        const data = await fs.readFile('test.txt', 'utf8');
        console.log('Async/Await data:', data);
    } catch (error) {
        console.log('Lỗi async:', error.message);
    }
}
async function readMultipleFiles() {
    try {
        const file1 = fs.readFile('a.txt', 'utf8');
        const file2 = fs.readFile('b.txt', 'utf8');

        const results = await Promise.all([file1, file2]);

        console.log('File A:', results[0]);
        console.log('File B:', results[1]);
    } catch (err) {
        console.log('Promise.all error:', err.message);
    }
}
const filePath = path.join(__dirname, 'test.txt');
console.log('File path:', filePath);

// GỌI HÀM
// readFileCallback();
// readFileAsync();
// readMultipleFiles();

console.log('Chương trình vẫn chạy tiếp (non-blocking)');
