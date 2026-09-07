const form = document.getElementById("loginForm");

form.addEventListener("submit",async function(e){

    e.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const response=await fetch("/api/v1/auth/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    });

    const data=await response.json();

    if(data.success){

        localStorage.setItem("token",data.token);

        alert("Login Successful");

        window.location.href="index.html";

    }else{

        alert(data.message);

    }

});