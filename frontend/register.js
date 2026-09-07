const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const response = await fetch("http://localhost:8080/api/v1/auth/register", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            email,
            password,
            phone,
            address
        })

    });

    const data = await response.json();

    if(data.success){

        alert(data.message);

        window.location.href="login.html";

    }else{

        alert(data.message);

    }

});