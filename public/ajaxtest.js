let ajaxImpl=(str)=>{
    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4  &&  this.status==200){
            let tableBody= document.getElementById("tblBody");
            tableBody.innerHTML="";
          let responseData=this.responseText;
          let jsonObj=JSON.parse(responseData);
          jsonObj.forEach((item,index)=>{

        
            let row=document.createElement("tr");
            let column=document.createElement("td");
            column.innerHTML=""+(index+1);
            row.appendChild(column);

            column=document.createElement("td");
            column.innerHTML=""+item.name;
            row.appendChild(column);

            column=document.createElement("td");
            column.innerHTML=""+item.email;
            row.appendChild(column);

            column=document.createElement("td");
            column.innerHTML=""+item.contact;
            row.appendChild(column);

            column=document.createElement("td");
            column.innerHTML="<a href='/deleteempbyid?eid="+item.empid+"'>DELETE</a>";
            row.appendChild(column);

            column=document.createElement("td");
            column.innerHTML="<a href=''>UPDATE</a>";
            row.appendChild(column);
            tableBody.appendChild(row);

        });
         
        }
    };
    xhttp.open("get","/search?sd="+str,true);
    xhttp.send();
}