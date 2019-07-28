
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
    // app_firebase = firebase;
  
    //User Form
    var buyToday = document.getElementById("buyToday");
    var buyh = document.getElementById("buyh");
    var buy = document.getElementById("buy");
    var sell = document.getElementById("sell");
    var closebuybtn = document.getElementById("closebuybtn");
    var addbuybtn = document.getElementById("addbuybtn");
    var buyh = document.getElementById("buyh");
    var inputSeller = document.getElementById("inputSeller");
    var inputItem = document.getElementById("inputItem");
    var inputQuantity = document.getElementById("inputQuantity");
    var inputPrice = document.getElementById("inputPrice");
    var inputBuyhSeller = document.getElementById("buyhSeller");
    var buyhrecord= document.getElementById("buyhrecord");
    var selector = document.getElementById("selector");
    var userSelect = selector.options[selector.selectedIndex].value;
    

    
    buy.addEventListener("click",openBuyForm)
    
    
    function openBuyForm() {
        console.log("open me guusa");
        document.getElementById("buyrecord").style.display = "none";
        document.getElementById("buyhForm").style.display = "none";
        document.getElementById("buyForm").style.display = "block";
        
    }
    closebuybtn.addEventListener("click",closeBuyForm)
    function closeBuyForm() {
        console.log("close me guusa")
        document.getElementById("buyForm").style.display = "none";
    }
    
    addbuybtn.addEventListener("click",addBuy)
    
    function addBuy() {
        
       firebase.firestore().collection("buy").doc(inputSeller.value).collection(inputSeller.value).doc().set({
         item: inputItem.value,
         quantity: inputQuantity.value,
         price: inputPrice.value,
         total: inputQuantity.value * inputPrice.value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
       })
       document.getElementById("inputSeller").value="";
       document.getElementById("inputItem").value="";
       document.getElementById("inputQuantity").value="";
       document.getElementById("inputPrice").value="";
    
    
    
        
        console.log("add me guusa")
        
    }

    buyh.addEventListener("click",openbuyh)
    function openbuyh() {
      console.log("open buyh me guusa");
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "block";
    }

    var table = document.getElementById("buy-list");
    
    function renderBuy(doc){
      
      
      var row = table.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var mydate = doc.data().timestamp.toDate();
      var str = mydate.toString();
      var putdate = str.slice(0,23); 

      cell0.innerHTML = putdate;
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      
    }
    


    buyhrecord.addEventListener("click",todayBuyData)

    function todayBuyData() {
      console.log("functin me gussa")
      console.log(userSelect)
      document.getElementById("buy-list").innerHTML = "";
      document.getElementById("sellerName").innerHTML = "";
      if (userSelect === "entire")
      var para = document.createElement("p");
      var node = document.createTextNode(inputBuyhSeller.value);
      para.appendChild(node);
      var element = document.getElementById("sellerName");
      element.appendChild(para);
      
      var row = table.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      cell0.innerHTML = "TIME";
      cell1.innerHTML = "ITEM";
      cell2.innerHTML = "QUANTITY";
      cell3.innerHTML = "PRICE";
      cell4.innerHTML = "TOTAL";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "block";
      firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection(inputBuyhSeller.value).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderBuy(doc);
        })
      });
      
    }
    
    
   
  
  
  })()