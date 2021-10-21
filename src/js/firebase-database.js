const baseURL = 'https://filmoteka-81e54-default-rtdb.firebaseio.com/';
let userUid = null;
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
    return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Watched.json`, {
      method: 'POST',
      body: JSON.stringify(watched),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        return watched;
      });
    // .then(addWatchedLocalStorage);
  }

  static addCardToQueue(queue) {
    return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Queue.json`, {
      method: 'POST',
      body: JSON.stringify(queue),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        return queue;
      });
  }

  static getCardsFromWatched() {
    return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Watched.json`) //?access_token=${token} //// ?auth=
      .then(response => {
        return response.json();
      })
      .then(object => {
        return Object.values(object);
      });
  }

  static getCardsFromQueue() {
    return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Queue.json`) //?access_token=${token} //// ?auth=
      .then(response => {
        return response.json();
      })
      .then(object => {
        return Object.values(object);
      });
  }

  static getUid(uid) {
    userUid = uid;
    console.log('🚀 ~ getUid ~ userUid', userUid);
  }
}
