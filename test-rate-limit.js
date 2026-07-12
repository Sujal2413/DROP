const http = require('http');

async function runTest() {
  const url = 'http://localhost:3000/api/waitlist';
  const payload = JSON.stringify({ name: 'Test', email: 'test@example.com' });

  console.log('Sending 20 concurrent requests...');

  const requests = Array.from({ length: 20 }).map((_, i) => 
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    }).then(res => res.status)
  );

  const statuses = await Promise.all(requests);
  
  const successCount = statuses.filter(s => s === 201 || s === 200).length;
  const rateLimitCount = statuses.filter(s => s === 429).length;
  
  console.log(`Success (201/200): ${successCount}`);
  console.log(`Rate Limited (429): ${rateLimitCount}`);
}

runTest();
