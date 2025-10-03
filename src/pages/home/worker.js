// worker.js
self.onmessage = (e) => {
  const { type, data } = e.data;
  if (type === 'post-to-worker') {
    // optional: reply back
    self.postMessage({ type: 'ack', data: "Worker received!" });
  } else {
    self.postMessage({ type: 'data-send', data: [] });
  }
};
