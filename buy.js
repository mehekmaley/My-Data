const inputItem = document.getElementById("inputItem");
const inputQuantity = document.getElementById("inputQuantity");
const inputSeller = document.getElementById("inputSeller");

const messageSeller = inputSeller.value;
const messageItem = inputItem.value;
const messageQuantity = inputQuantity.value;

function addClick(messageSeller,messageItem,messageQuantity) {
    const newBuyKey = firebase.database().ref().child('buy').push().key;
    const updates = {};
    const buyDetails = {
        eventId: newBuyKey,
        seller: messageSeller,
        item: messageItem,
        quantity: messageQuantity
    };

    updates['/buy/${newBuyKey}'] = buyDetails;

    return firebase.database().ref().update(updates);
};

// function writeNewPost(uid, username, picture, title, body) {
//     // A post entry.
//     var postData = {
//       author: username,
//       uid: uid,
//       body: body,
//       title: title,
//       starCount: 0,
//       authorPic: picture
//     };
  
//     // Get a key for a new Post.
//     var newPostKey = firebase.database().ref().child('posts').push().key;
  
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
//     return firebase.database().ref().update(updates);
//   }




// function addClick(messageSeller){
//     var firebaseRef = firebase.database().ref();
//     firebaseRef.child('text').set(messageSeller);
// }


