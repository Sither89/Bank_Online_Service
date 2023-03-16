function transfer_list() {
    const token = localStorage.getItem('token');
    let data = { Page: "transfer_his" }
    fetch('/gettran_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data_get => {
            console.log(data_get);
            if (data_get.status == 'ok') {


                const table = document.createElement("table");

                // Create table header
                const header = table.createTHead();
                const row = header.insertRow();
                const headers = ["Datetime", "User", "Remain", "Action", "From", "Amount"];
                for (let i = 0; i < headers.length; i++) {
                    const cell = row.insertCell();
                    cell.innerHTML = headers[i];
                }
                
                // Create table body
                const body = table.createTBody();
                for (let i = 0; i < data_get.existingTran.length; i++) {
                    const row = body.insertRow();
                    row.setAttribute("id" , i);
                    const data = Object.values(data_get.existingTran[i]);
                    for (let j = 1; j < data.length - 1 ; j++) {
                        const cell = row.insertCell();
                        cell.innerHTML = data[j];
                        if (j == 1) {
                            cell.setAttribute("id", `row${i}-col${j}`);
                        }
                    }
                }
                
                // Add table to HTML page
                // document.body.appendChild(table);
                document.getElementById('table_list').appendChild(table);
            } else {
                localStorage.removeItem('token');
                console.log("Data not ok");
                //window.location.href = '/login';
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function receive_list() {
    const token = localStorage.getItem('token');
    let data = { Page: "receive_his" };
    fetch('/gettran_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data_get => {
            console.log(data_get);
            if (data_get.status == 'ok') {


                const table = document.createElement("table");

                // Create table header
                const header = table.createTHead();
                const row = header.insertRow();
                const headers = ["Datetime", "User", "Remain", "Action", "From", "Amount"];
                for (let i = 0; i < headers.length; i++) {
                    const cell = row.insertCell();
                    cell.innerHTML = headers[i];
                }
                
                // Create table body
                const body = table.createTBody();
                for (let i = 0; i < data_get.existingTran.length; i++) {
                    const row = body.insertRow();
                    row.setAttribute("id" , i);
                    const data = Object.values(data_get.existingTran[i]);
                    for (let j = 1; j < data.length - 1 ; j++) {
                        const cell = row.insertCell();
                        cell.innerHTML = data[j];
                        if (j == 1) {
                            cell.setAttribute("id", `row${i}-col${j}`);
                        }
                    }
                }
                
                // Add table to HTML page
                // document.body.appendChild(table);
                document.getElementById('table_list').appendChild(table);
            } else {
                localStorage.removeItem('token');
                console.log("Data not ok");
                //window.location.href = '/login';
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
