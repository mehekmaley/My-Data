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
    // firebase.firestore().settings({timestampsInSnapshots: true})
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
      var dateAdd = firebase.firestore.FieldValue.serverTimestamp()
      
      // var timestampAdd = dateAdd.toDate()
      // var sdateAdd = timestampAdd.toString().slice(0,23)
      console.log(dateAdd)
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
      
      console.log("render ke andar")
      var row = table.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var mydate = doc.data().timestamp;
      // var mydate = doc.data().timestamp.toDate();
      // var str = mydate.toString();
      // var putdate = str.slice(0,23); 

      cell0.innerHTML = mydate;
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      
    }
    


    buyhrecord.addEventListener("click",todayBuyData)

    function todayBuyData() {
      console.log("function me gussa")
      console.log(selector.value)
      document.getElementById("buy-list").innerHTML = "";
      document.getElementById("sellerName").innerHTML = "";
     
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


      if(selector.value == "entire") {

         firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection(inputBuyhSeller.value).get().then((snapshot) => {
           snapshot.docs.forEach(doc => {
             renderBuy(doc);
           })
         });

       }

       else if(selector.value == "month") {

        var datum = new Date(Date.UTC('2019','07','01','23','31','30'));
        var tpm =  datum.getTime()/1000;
        console.log(tpm)

        var datum = new Date(Date.UTC('2019','08','01','23','31','30'));
        var tpn =  datum.getTime()/1000;
        console.log(tpn)

         var today = new Date();
         var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         var myMonth = date.toString();
         var currMonth = myMonth.slice(0,6)
         var currentMonth = currMonth.toString();
         var nxtMonth = myMonth.slice(5,6)
         var nmNum = Number(nxtMonth)+1
         var currYear = myMonth.slice(0,4)
         var nextMonth = currYear+'-'+nmNum
         console.log(nextMonth)
         console.log(currYear)
         console.log(nmNum)
         console.log(currMonth)
         console.log(myMonth)

        var ref = firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection(inputBuyhSeller.value);
        ref.where("timestamp.seconds", ">=", tpm).where("timestamp.seconds", "<", tpn).get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            console.log("firebase ke andar")
            renderBuy(doc);
          })
        });

       }
     }
































































































    
    
   
  
  
  })()