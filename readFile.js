const fs = require('fs').promises;

// fs.readFile('./readme.txt', (err, data) => {
//     if(err) {
//         throw err;
//     }
//     console.log(data);
//     console.log(data.toString());
// })

fs.writeFile('./writeme.txt', '글이 입력됩니다.')
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        // 프로미스 체인
        console.log(data.toString());
    })
    .catch((err) => {
        throw err;
    })