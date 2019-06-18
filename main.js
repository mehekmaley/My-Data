function openBuyForm() {
    document.getElementById("buyForm").style.display = "block";
}

function closeBuyForm() {
    document.getElementById("buyForm").style.display = "none";
}

var inputSeller = document.getElementById("inputSeller");

function addBuy() {
    var messageSeller = inputSeller.value;
    
    var firebaseRef = firebase.database().ref();

    firebaseRef.child('test').set(messageSeller);

    window.alert(messageSeller);
}