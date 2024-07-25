// const { setTimeout } = require("timers/promises");

var ADD = [];
var total = 0;




function Cart(value){
    var decide=document.getElementById(`${value}-btn`).textContent;
    if(decide==='Add item'){
    let x =document.getElementById(`${value}`).innerText;
    const temp = x.split("-");
    ADD.push(temp);
    Render(ADD)
    var btn = document.getElementById(`${value}-btn`);
    btn.innerText ="Remove";
    btn.style.color="red";
    }else{
        var btn = document.getElementById(`${value}-btn`);
        btn.innerText ="Add item";
        btn.style.color="black";
        var temparr = ADD;
        ADD=[];
        temparr.forEach(element => {
            if((element[0].toLowerCase()).includes(value.toLowerCase())){

            }else{
                ADD.push(element);
            }
           
        });
        Render(ADD);
    }
}
function Render(ADD){
    
    var table = document.getElementById("table");     
    var rows =table.querySelectorAll('#newrow');
    rows.forEach(element => {
        element.remove();   
    });    
    total=0;
    var i =1;
    ADD.forEach(item => {
        let t0 = document.createElement("td");
        t0.innerText=i;
        let t1=document.createElement("td");
        t1.innerText=item[0];
        let t2=document.createElement("td");
        t2.innerText=item[1];
        let r=document.createElement("tr");
        r.appendChild(t0);
        r.appendChild(t1);
        r.appendChild(t2);
        r.setAttribute("id","newrow");
        table.appendChild(r);
        i++;
    });
    ADD.forEach(element => {

        total+=Number(element[1].substring(2));
        document.getElementById('total').innerText = `$${total}`;
        
    });
}
function Book(event){
    var temp =total;
    event.preventDefault();
    ADD=[];
    Render(ADD);
    var bottom = document.getElementById('bottom');
    var p = document.createElement('p');
    p.innerText = "Thanks for shopping,Your order is booked Now!!!";
    p.style.color ='green';
    bottom.appendChild(p); 

    var params ={
        order_value:temp,
        from_name:document.getElementById('name').value,
        email_id:document.getElementById('email').value
    }
    try {
        emailjs.send('default_service', 'template_v6jjeel', params)
    .then((res) => {
      console.log(`Completed!!!:${res.status}`)
    })
        
    } catch (error) {
        alert(error)
        
    }

    setTimeout(Reload,3000);
}

function Reload(){
    location.reload();
}
