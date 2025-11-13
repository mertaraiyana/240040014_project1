//2. Event Hadnling & Manipulasi Elemen
const colorBlock = document.getElementById("colorBlock");
const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const label = event.target.innerText;

        if (label.includes("Biru")) {
            colorBlock.style.backgroundColor = "lightblue";
        } else if (label.includes("Hijau")) {
            colorBlock.style.backgroundColor = "lightgreen";
        } else if (label.includes("Reset")) {
            colorBlock.style.backgroundColor = "lightgrey";
        }
    });
});

//3. HTTP Request & Otentikasi
const btnLogin = document.getElementById("btnLogin");
const btnGetData = document.getElementById("btnGetData");
const output = document.getElementById("output");

btnLogin.addEventListener("click",async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Username dan Password wajib diisi.");
        return;
    }

    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username: username,password:password })
        });

        if (!response.ok) {
            throw new Error("Login gagal, periksa kembali kredensial anda!");
        }
        
        const data = await response.json();
        console.log("Token didapat:", data.accessToken);

        //Simpan token di local storage
        localStorage.setItem("authToken", data.accessToken);
        output.innerHTML = `<p style="color:green;">Token berhasil disimpan di localStorage. </p>`;
  } catch (err) {
    console.error(err.message);
    output.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});

btnGetData.addEventListener("click", async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("Silahkan login terlebih dahulu untuk mendapatkan token!");
        return;
    }

    try {
        const response = await fetch("https://dummyjson.com/c/cd87-475c-493b-bd2d", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data pengguna.");
        }

        const result = await response.json();
        console.log("Data pengguna:", result.data);

        let html = "<h3>Data Pengguna:</h3><ul>";

        for (const user of result.data) {
            html += `<li>${user.first_name} ${user.last_name}</li>`;
        }

        html += "<ul>";
        output.innerHTML = html;
        
    } catch (err) {
        console.error(err.message);
        output.innerHTML = `<p style="color:red">${err.message}</p>`;
    }
});
