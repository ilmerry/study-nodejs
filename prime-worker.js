const { Worker ,isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
const primes = [];

// 워커 없이 소수 찾기
function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++) {
        for(let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && j === 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
};

if (isMainThread){
    const max = 10_000_000;
    const threadCount = 8;
    const threads = new Set();
    const range = Math.ceil((max - min) / threadCount);
    let start = min;
    for (let i = 0; i < threadCount - 1; i++){
        const wStart = start;
        threads.add(new Worker(__filename, {workerData: {start: wStart, range}}));
    }
    // 8워커에게 일 분배
    threads.add(new Worker(__filename, {workerData: {start, range: range + ((max - min + 1) % threadCount)}}));
    for (let worker of threads) {
        worker.on('error', (err) => {
            // 워커에서 에러날 경우
            console.log(err);
        })
        worker.on('exit', () => {
            threads.delete(worker);
            if(threads.size === 0){
                console.log(primes.length);
            }
        });
        worker.on('message', (msg) => {
            // 8워커들의 결과값 합쳐주기
            primes = primes.concat(msg);
        });
    }
} else {
    findPrimes(workerData.start, workerData.range);
    parentPort.postMessage(primes);
}