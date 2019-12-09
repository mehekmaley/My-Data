(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCywpwZpiiAd7T8-inqjM_0VYBMyOBLTDg",
        authDomain: "fuck-9d68a.firebaseapp.com",
        databaseURL: "https://fuck-9d68a.firebaseio.com",
        projectId: "fuck-9d68a",
        storageBucket: "",
        messagingSenderId: "182573142402",
        appId: "1:182573142402:web:cbb760ba2e1d824a"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
     
        window.location.href = 'index.html';
    
      
    }
    else{
      document.getElementById("login_div").style.display = "block";
    }
    });
    var login1 = document.getElementById("login");
    login1.addEventListener('click',loginc)
    function loginc(){
    
      var userEmail = document.getElementById("email_field").value;
      var userPass = document.getElementById("password_field").value;
    
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error : " + errorMessage);
    
        // ...
      });
    
    }
    
    
})()