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
  
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if(user) {
    //     // window.location.href = 'index1.html';
    //     console.log("hi")
      
    //   }
    //   else{
    //     window.location.href = 'login.html'
    //   }
    //   });


    var str;
    var sell = document.getElementById('sell');
    var sellh = document.getElementById('sellh');
    sellh.addEventListener('click',openSellh);
    function openSellh() {
      // document.getElementById("buyrecord").style.display = "none";
      // document.getElementById("sellrecord").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById('sellForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'block';
      // document.getElementById('setupForm').style.display = 'none';

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'block';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
      
    }
    sell.addEventListener('click',openSell);
    function openSell() {
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("buyrecord").style.display = "none";
      // document.getElementById("sellrecord").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('sellForm').style.display = 'block';
      // document.getElementById('setupForm').style.display = 'none';

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "block";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
      console.log("chal")
      
    }
    var buyToday = document.getElementById("buyToday");
    var buyEntire = document.getElementById("buyEntire");
    var sellToday = document.getElementById("sellToday");

    sellToday.addEventListener("click",openTodayHistoryS)

    function openTodayHistoryS() {

     
      today = new Date();
      today = today.toISOString().slice(0,10);
      tableTodayS();
      firebase.firestore().collectionGroup("historyS").where("iso","==",today).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
         
          renderTodayS(doc);
          
        })
      });
     
      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      


    }



    var sellEntire = document.getElementById("sellEntire");

    sellEntire.addEventListener('click',openBuyEntireS);
    function openBuyEntireS() {
      str = "Entire";
      tableEntireS(str);
      firebase.firestore().collectionGroup("historyS").orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderTodayS(doc);
          
        })
      });
     
      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
     
    }




    var inputBuyer = document.getElementById('inputBuyer');
    var inputItemS = document.getElementById('inputItemS');
    var inputQuantityS = document.getElementById('inputQuantityS');
    var inputPriceS = document.getElementById('inputPriceS');
    var addsellbtn = document.getElementById('addsellbtn');
    var closesellbtn = document.getElementById('closesellbtn');
    //sell//////////

    addsellbtn.addEventListener("click",addSell)
    
    function addSell() {
      
      buyer = inputBuyer.value
      // var timestampAdd = dateAdd.toDate()
      // var sdateAdd = timestampAdd.toString().slice(0,23)
      
       firebase.firestore().collection("sell").doc(buyer).collection("historyS").doc().set({
         buyer: inputBuyer.value,
         item: inputItemS.value,
         quantity: inputQuantityS.value,
         price: inputPriceS.value,
         total: inputQuantityS.value * inputPriceS.value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
         
       });
      
       document.getElementById("inputBuyer").value="";
       document.getElementById("inputItemS").value="";
       document.getElementById("inputQuantityS").value="";
       document.getElementById("inputPriceS").value="";
      
        sliceTimeStamp_s();
        
        
    }

      function sliceTimeStamp_s(){
        
        firebase.firestore().collection("sell").doc(buyer).collection("historyS").orderBy("timestamp","desc").limit(1).get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            
             oidS = doc.id
          
             settsmS = doc.data({serverTimestamps: 'estimate'}).timestamp.toDate()
             isoS = settsmS.toISOString();
             isoS = isoS.slice(0,10);
             settsmS = settsmS.toString();
             monthS = settsmS.slice(4,7);
             addDate_s();
          })
        });
        
        
        
        
      }

      function addDate_s() { 
        
        firebase.firestore().collection("sell").doc(buyer).collection("historyS").doc(oidS).set({
          date: settsmS,
          month: monthS,
          iso: isoS
        }, {merge: true});
        
      }




    var buyMon = document.getElementById("buyMon");
    var buym = document.getElementById("buym");
    var buyd = document.getElementById("buyd");
    var pDat = document.getElementById("pDat");
    buym.addEventListener('click',buymonth);
    function buymonth() {
      str = buyMon.value;
      tableEntire(str);
      firebase.firestore().collectionGroup("history").where("month","==",buyMon.value).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        
          renderToday(doc);
          
        })
      });
      document.getElementById('buyMon').value = "";
    }
    buyd.addEventListener('click',buyDate);

    function buyDate() {
      str = pDat.value;
      tableEntire(str);
      firebase.firestore().collectionGroup("history").where("iso","==",pDat.value).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        
          renderToday(doc);
          
        })
      });
      document.getElementById('pDat').value = "";
    }

    



    buyEntire.addEventListener('click',openBuyEntire);
    function openBuyEntire() {
      str = "Entire";
      tableEntire(str);
      firebase.firestore().collectionGroup("history").orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
         
          renderToday(doc);
          
        })
      });
     
      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
     
    }

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
    var iscode = document.getElementById("iscode")
    var isaddr = document.getElementById("isaddr")
    var isphone = document.getElementById("isphone")
    var isemail = document.getElementById('isemail')
    var isfaxno = document.getElementById('isfaxno')
    var idisc = document.getElementById('idisc')
    var isgstno = document.getElementById('isgstno')
    var icgst = document.getElementById("icgst")
    var isgst = document.getElementById("isgst")
    var ipay = document.getElementById("ipay");
    var ihsn = document.getElementById("ihsn")
    var inputBuyhSeller = document.getElementById("buyhSeller");
    var buyhrecord= document.getElementById("buyhrecord");
    var selector = document.getElementById("selector");
    var buyMonthlyS = document.getElementById("buyMonthlySeller");
    
    var buyms = document.getElementById("buyms");
    var buyds = document.getElementById("buyds");
    var pdate = document.getElementById("pdate");
    var oid;
    var seller;
    var settsm;
    var today;
    var month;
    var iso;
    var oidS;
    var seller;
    var settsmS;
    var todayS;
    var monthS;
    var isoS;
    var buyer;
    //var seller = inputSeller.value;
    var read = 0;
    var buyts = document.getElementById("buyTodaySeller");
    var buyes = document.getElementById("buyEntireSeller");
    var setup = document.getElementById("setup");
    var companyP = document.getElementById("companyP");
    var saveCompany = document.getElementById("saveCompany")
    var iCname = document.getElementById("iCname");
    var iCaddr = document.getElementById("iCaddr");
    var iCphone = document.getElementById("iCphone");
    var iCfax = document.getElementById("iCfax");
    var iCpno = document.getElementById("iCpno");
    var iCemail = document.getElementById("iCemail");
    var items = document.getElementById("items")
    items.addEventListener('click',addItem)
    var saveItem = document.getElementById("saveItem")
    saveItem.addEventListener('click',saveI)
    var itemname = document.getElementById("itemname")
    var itemSprice = document.getElementById("itemSprice")
    var itemdiscount = document.getElementById("itemdiscount")
    var itemPrate = document.getElementById("itemPrate")
    var itemStatus = document.getElementById("itemStatus")
    var minstock = document.getElementById('itemStock')
    var istock = document.getElementById('istock');
    var stock = document.getElementById('stock')
    var stockh = document.getElementById("stockh")
    // stock.addEventListener('click',stocks)
    function stocks() {
      document.getElementById('stock-popup').style.display ='block'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
      tablestock();
      firebase.firestore().collection("items").get().then((snapshot) => {

        snapshot.docs.forEach(doc => {
          
          renderStock(doc);
          
        })
      });

    }
    var istable = document.getElementById("istock-list");
    function tablestock() {
      document.getElementById("istock-list").innerHTML = "";
      var row = istable.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      var cell7 = row.insertCell(7);
      cell0.innerHTML = "Item Name";
      cell1.innerHTML = "Selling Price";
      cell2.innerHTML = "Discount";
      cell3.innerHTML = "Purchase Rate";
      cell4.innerHTML = "Minimum Stock";
      cell5.innerHTML = "Initial Stock";
      cell6.innerHTML = "Stock on Hand";
      cell7.innerHTML = "Status";

    }
    function renderStock(doc) {
  
      var row = istable.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      var cell7 = row.insertCell(7);
      cell0.innerHTML = doc.data().itemname;
      cell1.innerHTML = doc.data().sprice;
      cell2.innerHTML = doc.data().discount;
      cell3.innerHTML = doc.data().prate;
      cell4.innerHTML = doc.data().minstock;
      cell5.innerHTML = doc.data().initialstock;
      cell6.innerHTML = doc.data().soh;
      cell7.innerHTML = doc.data().status;

      
    }
    function saveI() {
      firebase.firestore().collection("items").doc(itemname.value).set({
        itemname: itemname.value,
        sprice: itemSprice.value,
        discount: itemdiscount.value,
        prate: itemPrate.value,
        status: itemStatus.value,
        minstock:minstock.value,
        initialstock: istock.value,
        soh: istock.value
        })
    }

    function addItem() {
      // document.getElementById('itemsForm').style.display = 'block';
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      
      // document.getElementById("sellrecord").style.display = "none";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'block';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'block';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";

    }

    saveCompany.addEventListener('click',saveC)
    function saveC() {
      firebase.firestore().collection("company").doc(iCname.value).set({
        companyname: iCname.value,
        address: iCaddr.value,
        phone: iCphone.value,
        faxno: iCfax.value,
        pno: iCpno.value,
        email: iCemail.value,
        minstock: minstock.value
        })
    }
    companyP.addEventListener('click',setCP);
    function setCP(){
      // document.getElementById('companyForm').style.display = 'block';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      
      // document.getElementById("sellrecord").style.display = "none";


      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'block';
      document.getElementById('companyForm').style.display = 'block';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
    }
    // setup.addEventListener('click',setupo); new entries,325
    function setupo(){
      console.log("ya");
      // document.getElementById('setupForm').style.display = 'block';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      
      // document.getElementById("sellrecord").style.display = "none";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'block';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";

    }

    buyts.addEventListener('click',buyTS);
    function buyTS() {
      
      today = new Date();
      today = today.toISOString().slice(0,10);
      tableToday();
      firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection("history").where("iso","==",today).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          renderToday(doc);
          
        })
      });
    }
    buyes.addEventListener('click',buyES);
    function buyES() {
      str = "Entire";
      tableEntire(str);
      firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection("history").orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          renderToday(doc);
          
        })
      });
    }

    
    buy.addEventListener("click",openBuyForm)
    
    
    function openBuyForm() {
      // document.getElementById('setupForm').style.display = 'none';
      //   document.getElementById('sellhForm').style.display = 'none';
      //   document.getElementById("buyrecord").style.display = "none";
      //   document.getElementById("sellrecord").style.display = "none";
      //   document.getElementById("buyhForm").style.display = "none";
      //   document.getElementById('sellForm').style.display = "none";
      //   document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      //   document.getElementById("buyForm").style.display = "block";
      console.log("buy should open")
      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "block";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
        
    }
    var closesellbtn = document.getElementById("closesellbtn");
    closesellbtn.addEventListener('click',closeSell);
    function closeSell() {
      document.getElementById("sellForm").style.display = "none";
    }
    closebuybtn.addEventListener("click",closeBuyForm)
    function closeBuyForm() {
        
        document.getElementById("buyForm").style.display = "none";
    }
    
    addbuybtn.addEventListener("click",addBuy)
    var soh1,soh2,temp,temp2;
    function getsoh(doc){
      console.log(inputQuantity.value)
      soh1 = doc.data().soh;
      console.log(soh1)
      temp = Number(soh1);
      console.log(temp)
      soh2 = temp + Number(inputQuantity.value)
      console.log(soh2)
      addstock(soh2)
      

    }
    function addstock(soh2) {
      firebase.firestore().collection("items").doc(inputItem.value).set({
        soh: soh2
      },{merge: true});
    }
    function addBuy() {
      
      seller = inputSeller.value
      // var timestampAdd = dateAdd.toDate()
      // var sdateAdd = timestampAdd.toString().slice(0,23)
      // firebase.firestore().collection("items").doc(inputItem.value).get().then(function(doc){
      //   getsoh(doc)
      // })
      console.log(inputQuantity.value)
      
      console.log(inputItem.value)
       firebase.firestore().collection("buy").doc(inputSeller.value).collection("history").doc().set({
         seller: inputSeller.value,
         item: inputItem.value,
         quantity: inputQuantity.value,
         price: inputPrice.value,
         total: inputQuantity.value * inputPrice.value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //  code: iscode.value,
        //  address: isaddr.value,
        //  phone: isphone.value,
        //  email: isemail.value,
        //  faxno: isfaxno.value,
        //  gstno: isgstno.value,
        //  cgst: icgst.value,
        //  sgst: isgst.value,
        //  gtotal: Number(icgst.value) + Number(isgst.value),
        //  hsn: ihsn.value,
        //  pay: ipay.value,
        //  discount: idisc.value,
         pdf: '<a href="invoice.html">PDF</a>'
         
       });
      
       document.getElementById("inputSeller").value="";
       document.getElementById("inputItem").value="";
       document.getElementById("inputQuantity").value="";
       document.getElementById("inputPrice").value="";
       
       
        sliceTimeStamp();
        
        
    }

      function sliceTimeStamp(){
        
        firebase.firestore().collection("buy").doc(seller).collection("history").orderBy("timestamp","desc").limit(1).get().then((snapshot) => {
          snapshot.docs.forEach(doc => {
            
             oid = doc.id
          
             settsm = doc.data({serverTimestamps: 'estimate'}).timestamp.toDate()
             iso = settsm.toISOString();
             iso = iso.slice(0,10);
             settsm = settsm.toString();
             month = settsm.slice(4,7);
             addDate();
          })
        });
      }

      function addDate() { 
        
        firebase.firestore().collection("buy").doc(seller).collection("history").doc(oid).set({
          date: settsm,
          month: month,
          iso: iso
        }, {merge: true});
        
      }
  

    buyh.addEventListener("click",openbuyh)
    function openbuyh() {
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("buyrecord").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("sellrecord").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("buyhForm").style.display = "block";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "block";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "none";
    }

    var table = document.getElementById("buy-list");
    var tableS = document.getElementById("sell-list");
    function renderBuy(doc){
      
      var row = table.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var mydate = doc.data().timestamp.toDate();
      var str = mydate.toString();
      var putdate = str.slice(0,25); 

      cell0.innerHTML = putdate;
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      
    }
   
    function renderBuyS(doc){
      
      var row = tableS.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      

      cell0.innerHTML = doc.data().date.slice(0,25);
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      
    }

    function renderToday(doc){
      // email = localStorage.getItem("email");
      var row = table.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      // var mydate = doc.data().timestamp.toDate();
      // var str = mydate.toString();
      // var putdate = str.slice(0,25); 
      localStorage.setItem("dateIn",doc.data().date.slice(0,25))
      localStorage.setItem("itemIn",doc.data().item)
      localStorage.setItem("quanIn",doc.data().quantity)
      localStorage.setItem("priceIn",doc.data().price)
      localStorage.setItem("totalIn",doc.data().total)
      localStorage.setItem("sellerIn",doc.data().seller)
      localStorage.setItem("hsnIn",doc.data().hsn)
      localStorage.setItem("payIn",doc.data().pay)
      localStorage.setItem("cgstIn",doc.data().cgst)
      localStorage.setItem("sgstIn",doc.data().sgst)
      localStorage.setItem("gtotalIn",doc.data().gtotal)
      localStorage.setItem("discIn",doc.data().discount)
      cell0.innerHTML = doc.data().date.slice(0,25);
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      cell5.innerHTML = doc.data().seller;
      cell6.innerHTML = doc.data().pdf;
      
    }
    function renderTodayS(doc){
      
      var row = tableS.insertRow(-1);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      // var mydate = doc.data().timestamp.toDate();
      // var str = mydate.toString();
      // var putdate = str.slice(0,25); 

      cell0.innerHTML = doc.data().date.slice(0,25);
      cell1.innerHTML = doc.data().item;
      cell2.innerHTML = doc.data().quantity;
      cell3.innerHTML = doc.data().price;
      cell4.innerHTML = doc.data().total;
      cell5.innerHTML = doc.data().buyer;
      
    }
    
    buyToday.addEventListener("click",openTodayHistory)

    function openTodayHistory() {

      today = new Date();
      today = today.toISOString().slice(0,10);
      tableToday();
      firebase.firestore().collectionGroup("history").where("iso","==",today).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          renderToday(doc);
          
        })
      });
     
      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    


    }
    function tableEntire(str) { 
     
      document.getElementById("buy-list").innerHTML = "";
      document.getElementById("sellerName").innerHTML = str;
     
      // var para = document.createElement("p");
      // var node = document.createTextNode(inputBuyhSeller.value);
      // para.appendChild(node);
      // var element = document.getElementById("sellerName");
      // element.appendChild(para);
     
      var row = table.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      cell6.innerHTML = "INVOICE";
      cell0.innerHTML = "TIME";
      cell1.innerHTML = "ITEM";
      cell2.innerHTML = "QUANTITY";
      cell3.innerHTML = "PRICE";
      cell4.innerHTML = "TOTAL";
      cell5.innerHTML = "SELLER";
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("buyrecord").style.display = "block";
     
      // document.getElementById("sellrecord").style.display = "none";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "block";
      document.getElementById("sellrecord").style.display = "none";
    }
    //////sel


    function tableEntireS(str) { 
      
      document.getElementById("sell-list").innerHTML = "";
      document.getElementById("buyerNameH").innerHTML = str;
     
      // var para = document.createElement("p");
      // var node = document.createTextNode(inputBuyhSeller.value);
      // para.appendChild(node);
      // var element = document.getElementById("sellerName");
      // element.appendChild(para);
     
      var row = tableS.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      cell0.innerHTML = "TIME";
      cell1.innerHTML = "ITEM";
      cell2.innerHTML = "QUANTITY";
      cell3.innerHTML = "PRICE";
      cell4.innerHTML = "TOTAL";
      cell5.innerHTML = "BUYER";
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("sellrecord").style.display = "block";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "block";
    }
    


    function tableToday() { 
    
      document.getElementById("buy-list").innerHTML = "";
      document.getElementById("sellerName").innerHTML = today;
     
      // var para = document.createElement("p");
      // var node = document.createTextNode(inputBuyhSeller.value);
      // para.appendChild(node);
      // var element = document.getElementById("sellerName");
      // element.appendChild(para);
     
      var row = table.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      var cell6 = row.insertCell(6);
      cell6.innerHTML = "INVOICE";
      cell0.innerHTML = "TIME";
      cell1.innerHTML = "ITEM";
      cell2.innerHTML = "QUANTITY";
      cell3.innerHTML = "PRICE";
      cell4.innerHTML = "TOTAL";
      cell5.innerHTML = "SELLER";
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("sellrecord").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("buyrecord").style.display = "block";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "block";
      document.getElementById("sellrecord").style.display = "none";
    }
    
    function tableTodayS() { 
     
      document.getElementById("sell-list").innerHTML = "";
      document.getElementById("buyerNameH").innerHTML = today;
     
      // var para = document.createElement("p");
      // var node = document.createTextNode(inputBuyhSeller.value);
      // para.appendChild(node);
      // var element = document.getElementById("sellerName");
      // element.appendChild(para);
     
      var row = tableS.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      cell0.innerHTML = "TIME";
      cell1.innerHTML = "ITEM";
      cell2.innerHTML = "QUANTITY";
      cell3.innerHTML = "PRICE";
      cell4.innerHTML = "TOTAL";
      cell5.innerHTML = "BUYER";
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("sellrecord").style.display = "block";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "block";
    }


    function tableSeller() {
      
      //console.log(selector.value)
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
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById("buyrecord").style.display = "block";
      // document.getElementById("sellrecord").style.display = "none";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "block";
      document.getElementById("sellrecord").style.display = "none";

    }
    function tableSellerS() {
      
      //console.log(selector.value)
      document.getElementById("sell-list").innerHTML = "";
      document.getElementById("buyerNameH").innerHTML = "";
     
      var para = document.createElement("p");
      var node = document.createTextNode(buyername.value);
      para.appendChild(node);
      var element = document.getElementById("buyerNameH");
      element.appendChild(para);
     
      var row = tableS.insertRow(0);
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
      // document.getElementById('stock-popup').style.display = 'none';
      // document.getElementById('setup-popup').style.display = 'none';
      // document.getElementById('setupForm').style.display = 'none';
      // document.getElementById('itemsForm').style.display = 'none';
      // document.getElementById('companyForm').style.display = 'none';
      // document.getElementById('sellhForm').style.display = 'none';
      // document.getElementById("sellForm").style.display = "none";
      // document.getElementById("buyForm").style.display = "none";
      // document.getElementById("buyhForm").style.display = "none";
      // document.getElementById("buyrecord").style.display = "none";
      
      // document.getElementById("sellrecord").style.display = "block";

      document.getElementById('stock-popup').style.display ='none'
      document.getElementById('setupForm').style.display = 'none';
      document.getElementById('companyForm').style.display = 'none';
      document.getElementById('itemsForm').style.display = 'none';
      document.getElementById('sellhForm').style.display = 'none';
      document.getElementById("sellForm").style.display = "none";
      document.getElementById("buyForm").style.display = "none";
      document.getElementById("buyhForm").style.display = "none";
      document.getElementById("buyrecord").style.display = "none";
      document.getElementById("sellrecord").style.display = "block";


    }


    var sellMon = document.getElementById('sellMon');
    var sellm = document.getElementById('sellm');
    sellm.addEventListener('click',sellmonth);

    function sellmonth() {
      str = sellMon.value;
      tableEntireS(str);
      firebase.firestore().collectionGroup("historyS").where("month","==",str).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
        
          renderTodayS(doc);
          
        })
      });
      document.getElementById('sellMon').value = "";
    }
    var sellDat = document.getElementById('sellDat');
    var selld = document.getElementById('selld');
    // var logout = document.getElementById('logout'); //logout function
    // logout.addEventListener('click',logo)
    // function logo() {
        
    //     firebase.auth().signOut();
    //     window.location.href = "login.html"
      
    // }
    selld.addEventListener('click',sellDate);

    function sellDate() {
      str = sellDat.value;
      tableEntireS(str);
      firebase.firestore().collectionGroup("historyS").where("iso","==",str).orderBy("timestamp","asc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          
          renderTodayS(doc);
          
        })
      });
      document.getElementById('sellDat').value = "";
    }
    var buyername = document.getElementById('buyername');
    var sellMonthlyBuyer = document.getElementById('sellMonthlyBuyer');
    var sellmb = document.getElementById('sellmb');
    sellmb.addEventListener('click',sellmbuyer)
    function sellmbuyer() {
      
      tableSellerS();
  
      
      firebase.firestore().collection("sell").doc(buyername.value).collection("historyS").where("month","==",sellMonthlyBuyer.value).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderBuyS(doc);
          
        })
      });
      document.getElementById('sellMonthlyBuyer').value = "";
      document.getElementById('buyername').value = "";
    }

    var selldateb = document.getElementById('selldateb');
    var selldb = document.getElementById('selldb');
    selldb.addEventListener('click',selldbuyer);
    function selldbuyer() {
      
      tableSellerS();
      
      firebase.firestore().collection("sell").doc(buyername.value).collection("historyS").where("iso","==",selldateb.value).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
         
          renderBuyS(doc);
          
        })
      });
      document.getElementById('selldateb').value = "";
      document.getElementById('buyername').value = "";
    }




    buyms.addEventListener('click',buymseller)
    function buymseller() {
      tableSeller();
      firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection("history").where("month","==",buyMonthlyS.value).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderBuy(doc);
        })
      });
      document.getElementById('buyMonthlySeller').value = "";
      document.getElementById('buyhSeller').value = "";
    }
    buyds.addEventListener('click',buydseller)
    function buydseller() {
      tableSeller();
      
      firebase.firestore().collection("buy").doc(inputBuyhSeller.value).collection("history").where("iso","==",pdate.value).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderBuy(doc);
        })
      });
      document.getElementById('pdate').value = "";
      document.getElementById('buyhSeller').value = "";

    }
    var sellTB = document.getElementById('sellTB');
    var sellEB = document.getElementById('sellEB');

    sellTB.addEventListener('click',sellToB);
    sellEB.addEventListener('click',sellEnB);

    function sellToB() {
      today = new Date();
      today = today.toISOString().slice(0,10);
      tableTodayS();
      firebase.firestore().collection("sell").doc(buyername.value).collection("historyS").where("iso","==",today).orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderTodayS(doc);
          
        })
      });
    }
    function sellEnB() {
      str = "Entire";
      tableEntireS(str);
      firebase.firestore().collection("sell").doc(buyername.value).collection("historyS").orderBy("timestamp","desc").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          renderTodayS(doc);
          
        })
      });
    }
})()