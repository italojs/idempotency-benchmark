a# HTTP DELETE Benchmark Project

## Overview

This project is a benchmark analysis for evaluating the performance of the HTTP DELETE verb using the Fastify framework in a Node.js environment. The benchmark compares the execution of DELETE requests with and without the `await` keyword.

## Benchmark Setup

The benchmarks were conducted using `autocannon` with the following parameters:
- Method: DELETE
- Concurrent connections: 50
- Duration: 30 seconds
- Pipelining: 10

The tests were executed against two different endpoints:
- `http://localhost:3000/delete/no-await`
- `http://localhost:3000/delete/await`

## Results

- The `no-await` endpoint processed **33k requests in 30.04s, 7.43 MB read**.
┌─────────┬────────┬────────┬────────┬────────┬───────────┬───────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev     │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼───────────┼────────┤
│ Latency │ 257 ms │ 473 ms │ 657 ms │ 716 ms │ 456.87 ms │ 122.06 ms │ 758 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴───────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬──────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg      │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Req/Sec   │ 775    │ 775    │ 1,000  │ 1,570  │ 1,085.67 │ 171.4   │ 775    │
├───────────┼────────┼────────┼────────┼────────┼──────────┼─────────┼────────┤
│ Bytes/Sec │ 177 kB │ 177 kB │ 228 kB │ 358 kB │ 248 kB   │ 39.1 kB │ 177 kB │
└───────────┴────────┴────────┴────────┴────────┴──────────┴─────────┴────────┘


- The `await` endpoint processed **29k requests in 30.03s, 6.52 MB read**.
┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 366 ms │ 501 ms │ 708 ms │ 793 ms │ 514.36 ms │ 79.31 ms │ 975 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 667    │ 667    │ 991    │ 1,123  │ 961.04 │ 120.93  │ 667    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 151 kB │ 151 kB │ 224 kB │ 254 kB │ 217 kB │ 27.3 kB │ 151 kB │
└───────────┴────────┴────────┴────────┴────────┴────────┴─────────┴────────┘

Based on the results, the `no-await` approach performed better in this benchmark.


## How to Run

1. Ensure you have Node.js and npm installed.
2. Install dependencies: `npm install`.
3. Start the server: `node app.js`.
4. Run the benchmark: `autocannon -m DELETE -c 50 -d 30 -p 10 http://localhost:3000/delete/[await or no-await]`.

## Implementation Details

The server is built using Fastify and SQLite for handling database operations. It includes two endpoints for deleting the last record in the database: one using `await` and one without.

### Database Setup

SQLite is used for the database to simplify setup and teardown. The database is initialized with dummy data to simulate a realistic usage scenario.
