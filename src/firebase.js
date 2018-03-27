import { initializeApp } from 'firebase'

var app = initializeApp({
  apiKey: 'AIzaSyAVJIqtKhiIBFbmHuu9Vqm5eZzDvvevzQ0',
  authDomain: 'eksa-kanban.firebaseapp.com',
  databaseURL: 'https://eksa-kanban.firebaseio.com',
  projectId: 'eksa-kanban',
  storageBucket: 'eksa-kanban.appspot.com',
  messagingSenderId: '862755904053'
})

export const db = app.database()
export const kanban = db.ref('kanban')