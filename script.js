let account = JSON.parse(localStorage.getItem("accounts")) || []

function resetBank() {
    alert("Bank is Restarted")
    localStorage.clear();
    account = []
}

function returnToMenu() {
    window.location.href = "main.html";
}

function validation(event) {
    event.preventDefault();

    try {
        let accountNumber = document.getElementById("accountNumber").value.trim();
        let name = document.getElementById("name").value.trim();
        let balance = parseFloat(document.getElementById("balance").value);

        if (!accountNumber) throw "Account Number cannot be Empty"
        if (!name) throw "Account Name cannot be Empty"

        if (account.find(acc => acc[0] === accountNumber)) throw "Account Number must be Unique"
        

        if (isNaN(balance) || balance < 0) throw "Initial Balance must be 0 or greater"

        account.push([accountNumber, name, balance]);
        localStorage.setItem("accounts", JSON.stringify(account));

        alert("Account created successfully");
        console.log(account)
        returnToMenu();

    } catch (error) {
        alert("Error: " + error)
        returnToMenu();
    }
    
}






