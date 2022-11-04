const { Worker ,isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // 메인 스레드 ==> 워커스레드 생성
    const threads = new Set(); // 중복되지 않는 배열
    threads.add(new Worker(__filename, {
        workerData: { start: 1}
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2}
    }));
    for (let worker of threads) {
        worker.on('message', (value) => console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size === 0) {
                // 모든 워커들이 종료되었다면
                console.log('워커 끝~');
            }
        });
    }
} else {
    // 워커 스레드
    const data = workerData; // 보낸데이터 받아옴
    parentPort.postMessage(data.start + 100); // 101, 102로 만들어서 돌려줌

}