function loadProfile(){
    const token = localStorage.getItem('token');
    var load_Amount
    fetch('/getinfo_db', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            console.log(data_get);
            if (data_get.status == 'ok') {
                //alert('info ok')
                console.log(data_get);
                var load_Username = data_get.user;
                var load_firstName = data_get.firstName;
                var load_lastName = data_get.lastName;
                load_Amount = data_get.Amount;
                document.getElementById("namehome").innerHTML = `${load_firstName} ${load_lastName}`;
                document.getElementById("Cur_balance").innerHTML = load_Amount;
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

    console.log(load_Amount);
}