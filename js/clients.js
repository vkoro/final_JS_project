


let table = document.querySelector(".clients");
let statistics = document.querySelector(".statistics");
let informPopup = document.querySelector(".confirm-remove");
let closeBtn = informPopup.querySelector(".close");

function statistic(obj, balance) {
    obj.total++;
    if(balance > obj.maxBalance) {
        obj.maxBalance = balance;
    }
}

async function clients() {
    let response = await fetch("https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json");

    if (response.ok) {
        let json = await response.json();

        let female = {
            total: 0,
            maxBalance: 0
        }
        let male = {
            total: 0,
            maxBalance: 0
        }
        for(let client of json) {
            let balance = client.balance.slice(1).replaceAll(",", "");
            statistic(client.gender == "male"? male : female, balance)

            let tr = document.createElement("tr");

            if(client.isActive === false) {
                tr.classList.add("disabled-tr")
            }

            let td1 = document.createElement("td");
            td1.innerHTML = client.name;
            tr.appendChild(td1);

            let td2 = document.createElement("td");
            td2.classList.add("company")
            td2.innerHTML = client.company;
            tr.appendChild(td2);

            let td3 = document.createElement("td");
            td3.classList.add("email")
            td3.innerHTML = client.email;
            tr.appendChild(td3);

            let td4 = document.createElement("td");
            td4.classList.add("phone")
            td4.innerHTML = client.phone;
            tr.appendChild(td4);

            let td5 = document.createElement("td");
            td5.classList.add("balance")
            td5.innerHTML = client.balance;
            tr.appendChild(td5);

            let td6 = document.createElement("td");
            td6.classList.add("reg-date")
            let register = client.registered;
            register = register.replaceAll(" ","")
            td6.innerHTML = moment(register).format("DD.MM.YYYY");
            tr.appendChild(td6);

            let td7 = document.createElement("td");
            td7.classList.add("remove-tr")
            td7.innerHTML = "<span class='delete-btn'></span>";
            tr.appendChild(td7);
            let confirm = td7.querySelector("span")

            td7.addEventListener("click", function(){
                let popup = document.createElement("section");
                popup.innerHTML = "<p>Вы действительно хотите удалить?</p>" +
                    "<p class='btn-line'><span class='confirm'>Да</span>" +
                    "<span class='cancel'>Нет</span></p>";
                confirm.appendChild(popup)
                let confirmation = document.querySelector(".confirm")
                let cancel = td7.querySelector(".cancel")
                cancel.addEventListener("click", function(event){
                    event.stopPropagation()
                    popup.remove();
                });
                confirmation.addEventListener("click", function(event){
                    event.stopPropagation()
                    tr.remove();
                    informPopup.classList.remove("invisible");
                    setTimeout(function() {
                        informPopup.classList.add("easy-hide")
                    }, 1000);
                })
            })
            table.appendChild(tr);
        }
        let maleAccount = statistics.querySelector(".male-account")
        let maleMaxBalance = statistics.querySelector(".male-maxbalance")
        let femaleAccount = statistics.querySelector(".female-account")
        let femaleMaxBalance = statistics.querySelector(".female-maxbalance")
        let maxMale = male.maxBalance.split('');
        maxMale.splice(1, 0, ',');
        let maxFemale = female.maxBalance.split('');
        maxFemale.splice(1, 0, ',');

        maleAccount.innerHTML = `${male.total} чел`;
        maleMaxBalance.innerHTML = `$ ${maxMale.join("")}`
        femaleAccount.innerHTML = `${female.total} чел`
        femaleMaxBalance.innerHTML = `$ ${maxFemale.join("")}`;

    } else {
        console.log("Ошибка HTTP: " + response.status);
    }
}

closeBtn.addEventListener("click", () => {
    informPopup.classList.remove("easy-hide");
    setTimeout(function() {
        informPopup.classList.add("invisible");
    }, 1000);
})

clients()