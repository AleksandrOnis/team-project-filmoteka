const baseURL = 'https://filmoteka-81e54-default-rtdb.firebaseio.com/';
import Notiflix from 'notiflix';
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
    if (userUid)
      return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Watched.json`, {
        method: 'POST',
        body: JSON.stringify(watched),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          watched.id = response.name;
          createNoti(1);
          return watched;
        });
    else createNoti(0);
    // .then(addWatchedLocalStorage);
  }

  static addCardToQueue(queue) {
    if (userUid)
      return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Queue.json`, {
        method: 'POST',
        body: JSON.stringify(queue),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(response => {
          queue.id = response.name;
          createNoti(1);
          return queue;
        });
    else createNoti(0);
  }

  static getCardsFromWatched() {
    if (userUid)
      return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Watched.json`) //?access_token=${token} //// ?auth=
        .then(response => {
          return response.json();
        })
        .then(object => {
          createNoti(1);
          return Object.values(object);
        });
    // .catch(createNotiError());
    else createNoti(0);
  }

  static getCardsFromQueue() {
    if (userUid)
      return fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Queue.json`) //?access_token=${token} //// ?auth=
        .then(response => {
          return response.json();
        })
        .then(object => {
          createNoti(1);
          return Object.values(object);
        });
    // .catch(createNotiError());
    else createNoti(0);
  }

  static delCardToWatched(film) {
    if (userUid)
      return fetch(
        `https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Watched/film.json`,
        {
          method: 'DELETE',
          body: JSON.stringify(film),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(createNoti(1));
    // .then(response => response.json())
    // .then(response => {
    //   return film;
    // });
    // .then(addWatchedLocalStorage);
    else createNoti(0);
  }

  static delCardToQueue(film) {
    if (userUid)
      return (
        fetch(`https://filmoteka-81e54-default-rtdb.firebaseio.com/${userUid}/Queue/film.json`, {
          method: 'DELETE',
          body: JSON.stringify(film),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          // .then(response => response.json())
          // .then(response => {
          .then(createNoti(1))
      );
    //   return film;
    // });
    else createNoti(0);
  }

  static getUid(uid) {
    userUid = uid;
    console.log('🚀 ~ getUid ~ userUid', userUid);
  }
}

function createNoti(value) {
  value
    ? Notiflix.Notify.success('Done', {
        width: '170px',
        rtl: false,
      })
    : Notiflix.Notify.failure('First you need to login', {
        width: '170px',
        rtl: false,
      });
}
// function createNotiError() {
//   Notiflix.Notify.failure('There is nothing here yet', {
//     width: '170px',
//     rtl: false,
//   });
// }
