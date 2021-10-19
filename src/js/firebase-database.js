const baseURL = 'https://filmoteka-81e54-default-rtdb.firebaseio.com/';

export class Request {
  static create(signup) {
    fetch('baseURL .signup.json', {
      method: 'POST',
      body: JSON.stringify(signup),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  }

  static addCardToWatched(watched) {
    //заминить на film
    return fetch('https://filmoteka-81e54-default-rtdb.firebaseio.com/Watched.json', {
      method: 'POST',
      body: JSON.stringify(watched),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        watched.id = response.name;
        return watched;
      });
    // .then(addWatchedLocalStorage);
  }

  static addCardToQueue(queue) {
    return fetch('https://filmoteka-81e54-default-rtdb.firebaseio.com/Queue.json', {
      method: 'POST',
      body: JSON.stringify(queue),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        queue.id = response.name;
        console.log('🚀 ~ addCardToQueue ~ queue', queue);
        return queue;
      });
    // .then(addQueueLocalStorage);
  }
}

// function addWatchedLocalStorage(watched) {
//   localStorage.setItem('Watched', JSON.stringify(watched));
// }

// function addQueueLocalStorage(queue) {
//   localStorage.setItem('Queue', JSON.stringify(queue));
// }
