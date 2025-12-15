let account = [];

// Toggle Menu
function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.style.display = "none";
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = "block";
    }

    document.querySelectorAll("input").forEach(input => {
        input.value = "";
    });

    const outputs = [
        "createOutput",
        "depositOutput",
        "withdrawOutput",
        "checkOutput",
        "displayOutput",
        "searchResult"
    ];

    outputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = "";
            el.className = "output"; 
        }
    });

    document.querySelectorAll(".navbar li a").forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.navbar li a[onclick*="${sectionId}"]`);
    if (activeLink) activeLink.classList.add("active");

    const navLinks = document.getElementById("nav-links");
    if (window.innerWidth <= 1177 && navLinks.classList.contains("show")) {
        navLinks.classList.remove("show");
    }
}

// Show home by default
window.onload = () => showSection("home");

// Return to home
function returnToMenu() {
    showSection("home");
}

// Create Account
function createAccount(e) {
    e.preventDefault();
    const output = document.getElementById("createOutput");

    try {
        const accNo = document.getElementById("createAccountNumber").value.trim();
        const name = document.getElementById("createName").value.trim();
        const bal = parseFloat(document.getElementById("createBalance").value);

        if (!accNo || !name || isNaN(bal)) throw "All fields are required";
        if (account.find(a => a[0] === accNo)) throw "Account number already exists";

        account.push([accNo, name, bal]);

        output.classList.add("success");
        output.innerHTML = "Account successfully created!";
    } catch (err) {
        output.classList.add("error");
        output.innerHTML = err;
    }
}

// Deposit Money
function depositMoney(e) {
    e.preventDefault();
    const output = document.getElementById("depositOutput");

    try {
        const accNo = document.getElementById("depositAccountNumber").value.trim();
        const amount = parseFloat(document.getElementById("depositBalance").value);
        const acc = account.find(a => a[0] === accNo);

        if (!acc) throw "Account not found";
        if (isNaN(amount) || amount <= 0) throw "Invalid deposit amount";

        acc[2] += amount;

        output.classList.add("success");
        output.innerHTML = `Deposit successful. <br> New balance: ₱${acc[2].toFixed(2)}`;
    } catch (err) {
        output.classList.add("error");
        output.innerHTML = err;
    }
}


// Withdraw Money
function withdraw(e) {
    e.preventDefault();
    const output = document.getElementById("withdrawOutput");

    try {
        const accNo = document.getElementById("withdrawAccountNumber").value.trim();
        const amount = parseFloat(document.getElementById("withdrawBalance").value);
        const acc = account.find(a => a[0] === accNo);

        if (!acc) throw "Account not found";
        if (isNaN(amount) || amount <= 0) throw "Invalid amount";
        if (amount > acc[2]) throw "Insufficient balance";

        acc[2] -= amount;

        output.classList.add("success");
        output.innerHTML = `Withdrawal successful. <br> Remaining balance: ₱${acc[2].toFixed(2)}`;
    } catch (err) {
        output.classList.add("error");
        output.innerHTML = err;
    }
}

// Check Balance
function checkBalance(e) {
    e.preventDefault();
    const output = document.getElementById("checkOutput");

    try {
        const accNo = document.getElementById("checkAccountNumber").value.trim();
        const acc = account.find(a => a[0] === accNo);

        if (!acc) throw "Account not found";

        output.classList.add("success");
        output.innerHTML = `Balance: ₱${acc[2].toFixed(2)}`;
    } catch (err) {
        output.classList.add("error");
        output.innerHTML = err;
    }
}

// Display Accounts
function displayAccounts(e) {
    e.preventDefault();
    const output = document.getElementById("displayOutput");

    if (account.length === 0) {
        alert("No accounts found!");
        return;
    }

    let table = `<table>
        <tr><th>Account #</th><th>Name</th><th>Balance</th></tr>`;
    account.forEach(a => {
        table += `<tr>
            <td>${a[0]}</td>
            <td>${a[1]}</td>
            <td>₱${a[2].toFixed(2)}</td>
        </tr>`;
    });
    table += `</table>`;

    output.innerHTML = table;
}

// Search Account
function searchAccount(e) {
    e.preventDefault();
    try {
        const nameQuery = document.getElementById("searchName").value.trim().toLowerCase();
        if (!nameQuery) throw "Enter a name";

        const resultDiv = document.getElementById("searchResult");
        resultDiv.innerHTML = "";

        const matches = account.filter(a => a[1].toLowerCase().includes(nameQuery));
        if (matches.length === 0) throw "No accounts found";

        let table = `<table>
            <tr><th>Account Number</th><th>Name</th><th>Balance</th></tr>`;
        matches.forEach(a => {
            table += `<tr><td>${a[0]}</td><td>${a[1]}</td><td>₱${a[2].toFixed(2)}</td></tr>`;
        });
        table += `</table>`;
        resultDiv.innerHTML = table;
    } catch (err) {
        alert("Error: " + err);
    }
}