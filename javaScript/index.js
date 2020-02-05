let urlPre="/bbl";

async function addUser() {
    resetErrorMessages();
    let name = document.getElementById("userName").value;
    let password = document.getElementById("userPassword").value;
    let passwordConfirm = document.getElementById("userPasswordConfirm").value;
    checkName(name);
    await new Promise(r => setTimeout(r, 50));
    console.log(sessionStorage.getItem("valid"))
    if (name === "" || password === "") {
        document.getElementById("noEntryErrorMessage").setAttribute("style", "");
    } else if (name.length > 20) {
        document.getElementById("nameTooLongErrorMessage").setAttribute("style", "");
    } else if (password !== passwordConfirm) {
        document.getElementById("differentPasswordsErrorMessage").setAttribute("style", "");
    } else if (sessionStorage.getItem("valid") === "true") {
        let user = {
            "username": name,
            "hashedPassword": hash(password),
            "boulders": []
        }
        axios.post(urlPre + "/userApp/user", user).then(() => {
            $('#addUserForm').modal('hide')
        });
    }
}

function getData() {
    axios.get(urlPre + "/userApp/user")
        .then(response => {login(response.data);});
    document.getElementById("invalidLoginErrorMessage").setAttribute("style","");
}

function checkName(name) {
    sessionStorage.setItem("valid","true");
    axios.get(urlPre + "/userApp/user")
        .then(response => {
            for (let i=0; i<response.data.length; i++) {
                if (name===response.data[i].username.toString()) {
                    document.getElementById("nonUniqueNameErrorMessage").setAttribute("style","");
                    sessionStorage.setItem("valid","false");
                }
            }
        })
}

function login(users) {
    document.getElementById("invalidLoginErrorMessage").setAttribute("style", "display: hidden");
    let name = document.getElementById("usernameInput");
    let password = document.getElementById("passwordInput");
    for (let i = 0; i < users.length; i++) {
        if (name.value === users[i].username.toString() && hash(password.value) === users[i].hashedPassword.toString()) {
            sessionStorage.setItem("userID", users[i].id);
            window.location = "html/bucketList.html";
        }
    }
}

function resetErrorMessages() {
    document.getElementById("noEntryErrorMessage").setAttribute("style", "display: none");
    document.getElementById("nameTooLongErrorMessage").setAttribute("style","display: none");
    document.getElementById("nonUniqueNameErrorMessage").setAttribute("style","display: none");
    document.getElementById("differentPasswordsErrorMessage").setAttribute("style","display: none")
}

function resetModalValues() {
    document.getElementById("userName").value = "";
    document.getElementById("userPassword").value = "";
    document.getElementById("userPasswordConfirm").value = "";
}

function hash(s) {
    let a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
}
