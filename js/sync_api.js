function authen() {
    const token = localStorage.getItem('token');

    fetch('/authen_db', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_authen => {
            if (data_authen.status == 'ok') {
                //pass
            } else {
                localStorage.removeItem('token');
                alert('กรุณาเข้าสู่ระบบก่อน');
                window.location.href = '/login';
            }
            console.log('Success:', data_authen);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function checktoken() {
    const token = localStorage.getItem('token');

    fetch('/getinfo_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            if (data_get.status == 'ok') {
                window.location = '/profile'
            } else {
                localStorage.removeItem('token');
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function redirect_from() {
    const token = localStorage.getItem('token');

    fetch('/getinfo_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            if (data_get.status == 'ok') {
                window.location = '/profile'
            } else {
                localStorage.removeItem('token');
                window.location = '/login'
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function login() {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const data = { user: user, password: password };
    // console.log(user);
    // console.log(password);
    fetch('/login_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'ok') {
                localStorage.setItem('token', data.token);
                console.log(data);
                window.location = '/profile'
            } else {
                alert('Username or password incorrect !!');
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

function deposit_process() {
    const token = localStorage.getItem('token');
    let deposit = document.getElementById("deposit").value;
    // console.log("Check!!");


    fetch('/getinfo_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            if (data_get.status == 'ok') {
                //alert('info ok')
                console.log(data_get.Amount);
                var load_Amount = data_get.Amount;
                if (deposit === "") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                } else if (deposit <= 0) {
                    alert("ไม่ได้สามารถฝากเงินได้ โปรดตรวจสอบอีกครั้ง");
                } else {
                    let remain = Number(load_Amount) + Number(deposit);
                    console.log(remain);
                    console.log(deposit);
                    let data = { Remain: remain + "", Action: 'deposit', Amount: deposit }
                    console.log("res")
                    fetch('/addtransaction_db', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                alert('ฝากเงินเสร็จสิ้น')
                            } else {
                                alert('ERROR!');
                            }
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            } else {
                localStorage.removeItem('token');
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}

function withdraw_process() {
    const token = localStorage.getItem('token');
    let withdraw = document.getElementById("deposit").value;
    // console.log("Check!!");

    fetch('/getinfo_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            if (data_get.status == 'ok') {
                //alert('info ok')
                console.log(data_get.Amount);
                var load_Amount = data_get.Amount;
                if (withdraw === "") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                } else if (withdraw <= 0) {
                    alert("ไม่ได้สามารถถอนเงินได้ โปรดตรวจสอบอีกครั้ง");
                } else if (Number(load_Amount) - Number(withdraw) < 0) {
                    alert("ไม่สามารถถอนเงินเกินจำนวนเงินในบัญชี โปรดตรวจสอบอีกครั้ง")
                } else {
                    let remain = Number(load_Amount) - Number(withdraw);
                    console.log(remain);
                    console.log(withdraw);
                    let data = { Remain: remain + "", Action: 'withdraw', Amount: withdraw }
                    console.log("res")
                    fetch('/addtransaction_db', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                alert('ถอนเงินเสร็จสิ้น')
                            } else {
                                alert('ERROR!');
                            }
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            } else {
                localStorage.removeItem('token');
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function transfer_process() {
    const token = localStorage.getItem('token');
    let moneytransfer = document.getElementById("deposit").value;
    let user = document.getElementById("user").value;
    fetch('/getinfo_db', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            if (data_get.status == 'ok') {
                //alert('info ok')
                console.log(data_get.Amount);
                var user_db = data_get.user;
                var load_Amount = data_get.Amount;
                if (moneytransfer === "") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                } else if (moneytransfer <= 0) {
                    alert("ไม่ได้สามารถโอนเงินได้ โปรดตรวจสอบอีกครั้ง");
                } else if (Number(load_Amount) - Number(moneytransfer) < 0) {
                    alert("ไม่สามารถโอนเงินเกินจำนวนเงินในบัญชี โปรดตรวจสอบอีกครั้ง");
                }else if(user_db === user){
                    alert("ไม่สามารถโอนเงินเข้าบัญชีตัวเองได้ โปรดตรวจสอบอีกครั้ง");
                } else {
                    let remain = Number(load_Amount) - Number(moneytransfer);
                    console.log(remain);
                    console.log(moneytransfer);
                    let data = { Remain: remain + "", Action: 'transfer', Amount: moneytransfer, Username: user }
                    console.log("res")
                    fetch('/addtransaction_db', {
                        method: 'POST', // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(data),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                alert('ถอนเงินเสร็จสิ้น')
                            } else {
                                alert('ERROR!');
                            }
                            console.log('Success:', data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            } else {
                localStorage.removeItem('token');
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}