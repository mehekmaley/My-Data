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
    var datein, itemin, quanin, pricein, totalin,sellerin,payin,hsnin,sgstin,cgstin,gtotalin,discin;
    var cname, caddr, cemail;

    function render(doc) {
        cname = doc.data().companyname;
        caddr = doc.data().address;
        cemail = doc.data().email;
        cfaxno = doc.data().faxno;
        cpno = doc.data().pno;
        cphone = doc.data().phone;
        console.log(cname);
        console.log(caddr);
        console.log(cemail);
        document.getElementById("cname").innerHTML = cname;
        document.getElementById("caddr").innerHTML = caddr;
        document.getElementById("cemail").innerHTML = cemail;
        document.getElementById("cfaxno").innerHTML = cfaxno;
        document.getElementById("cpno").innerHTML = cpno;
        document.getElementById("cphone").innerHTML = cphone;

    }
    html2canvas(document.querySelector("#PrintPage")).then(canvas => {
        //document.body.appendChild(canvas)
        datein = localStorage.getItem("dateIn")
        itemin = localStorage.getItem("itemIn")
        quanin = localStorage.getItem("quanIn")
        pricein = localStorage.getItem("priceIn")
        totalin = localStorage.getItem("totalIn")
        sellerin = localStorage.getItem("sellerIn")
        hsnin = localStorage.getItem("hsnIn")
        payin = localStorage.getItem("payIn")
        cgstin = localStorage.getItem("cgstIn")
        sgstin = localStorage.getItem("sgstIn")
        gtotalin = localStorage.getItem("gtotalIn")
        discin = localStorage.getItem("discIn")
        console.log(datein)
        console.log(itemin)
        document.getElementById("sname").innerHTML = sellerin;
        document.getElementById("sdate").innerHTML = datein;
        document.getElementById("item").innerHTML = itemin;
        document.getElementById("pay").innerHTML = payin;
        document.getElementById("hsn").innerHTML = hsnin;
        document.getElementById("price").innerHTML = pricein;
        document.getElementById("quan").innerHTML = quanin;
        document.getElementById("cgst").innerHTML = cgstin;
        document.getElementById("sgst").innerHTML = sgstin;
        document.getElementById("gtotal").innerHTML = gtotalin;
        document.getElementById("total").innerHTML = totalin;
        var st = Number(gtotalin) + Number(totalin);
        document.getElementById("alltotal").innerHTML = st;
        document.getElementById("disc").innerHTML = discin;

        document.getElementById("gtotalm").innerHTML = gtotalin;
        document.getElementById("totalm").innerHTML = totalin;
        document.getElementById("alltotalm").innerHTML = st;

        firebase.firestore().collection("company").doc("XYZ").get().then(function(doc) {
            
                render(doc)
        
        })
        
        
    
    var canvasSVGContext = new CanvasSVG.Deferred();
        canvasSVGContext.wrapCanvas(canvas);
    //var canvasContext = c.getContext("2d");
    
    //document.body.appendChild(canvasContext.getSVG());
    });
})()