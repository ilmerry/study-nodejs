const min = 2;
const max = 10_000_000;
const primes = [];

// 워커 없이 소수 찾기
function generatePrimes(start, range) {
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
}