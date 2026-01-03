const BASE_URL = "http://localhost:8080/graph";



async function authenticate() {
    const status = document.getElementById("authStatus");

    try {
        const response = await fetch(`${BASE_URL}/auth`);
        if(!response.ok){
            console.log("error Occured");;
            return null;
        }

        const text = await response.text();
        status.innerText = text;

    } catch (error) {
        status.innerText = "Authentication failed";
        console.error(error);
    }
}


async function loadMails() {
    const list = document.getElementById("mailList");
    

    try {
        const response = await fetch(`${BASE_URL}/allMail`);

        if(!response.ok){
            console.log("Eroor Occured ") ;
            return null;
        }
        const data = await response.json();

        list.innerHTML = "";
        data.forEach(mail => {
            const li = document.createElement("li");
            li.innerText = mail;

            // when i click on any mail the mail go to the section from where i get the data 
            li.onclick = () => {
                document.getElementById("toMail").value = mail;
            };

            list.appendChild(li);
        });

    } catch (error) {
        list.innerHTML = "<ol>Error loading emails</ol>";
        console.error(error);
    }
}


async function sendMail() {
    const from = document.getElementById("fromMail").value;
    const to = document.getElementById("toMail").value;
    const status = document.getElementById("sendStatus");

    if (!from || !to) {
        status.innerText = "Both email fields are required";
        return null;
    }

    status.innerText = "Sending...";

    try {
        const url = `${BASE_URL}/sendToMail?mail=${from}&mail2=${to}`;
        const response = await fetch(url);

        if(!response.ok){
            console.log("error");
            return null;
        }
        
        const text = await response.text();

        status.innerText = text;
    } catch (error) {
        status.innerText = "Failed to send mail";
        console.error(error);
    }
}
