const fs = require('fs');
const readStream = fs.createReadStream('./lyrics.txt', {highWaterMark: 16}); // 조각내서 가져옴

const data = [];
readStream.on('data', (chunk) => {
    console.log(chunk, chunk.length);
    data.push(chunk);
})

readStream.on('end', () => {
    console.log('end:', Buffer.concat(data).toString());
})

readStream.on('error', () =>{
    // 비동기는 항상 에러처리를 해주어야 한다
    console.log('error:', err);
})