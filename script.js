var config = {
  apiKey: "AIzaSyCdX0Bhu9-P5cDC6XnPW1RqNFQVccedEX0",
  authDomain: "frontseat-7a708.firebaseapp.com",
  databaseURL: "https://frontseat-7a708.firebaseio.com",
  projectId: "frontseat-7a708",
  storageBucket: "frontseat-7a708.appspot.com",
  messagingSenderId: "360800591912"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

function getFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

$('#new-contact-submit').on('click', (e) => {
  db.collection("contacts").add(getFormData($('#new-contact')))
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
});


function makeContactRow(contactDetails){
  return `<tr>
  <td>${contactDetails.fullName}</td>
  <td>${contactDetails.nickName}</td>
  <td>${contactDetails.gender}</td>
  <td>${contactDetails.phone}</td>
  <td>${contactDetails.email}</td>
  </tr>`
}

var contactsRef = db.collection("contacts");

contactsRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log(doc.data().fillName);
    $("#contacts-list").append(makeContactRow(doc.data()));
  });
}).catch(function(error) {
  console.log("Error getting document:", error);
});
