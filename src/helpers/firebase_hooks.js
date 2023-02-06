import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()
const productsRef = db.collection('users')

// Retrieve all documents from the 'products' collection
productsRef.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const data = doc.data()
    // Reformat the data
    const newData = reformatData(data)
    // Update the document with the new data
      console.log(newData)
    doc.ref.update(newData)
  })
})

function reformatData(data) {
  // Your code to reformat the data goes here
  // ...
    const newData = {
        ...data,
        date: data.date.toDate(),
        lastUpdated: data.lastUpdated.toDate(),
    }
  return newData
}
