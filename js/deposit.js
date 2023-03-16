function deposit () {
    const token = localStorage.getItem('token');
    let deposit = document.getElementById("deposit").value;
    // console.log(deposit);
    var load_Amount ;

    fetch('/getinfo_db', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(response => response.json())
        .then(data_get => {
            // console.log(data_get);
            if (data_get.status == 'ok') {
                //alert('info ok')
                console.log(data_get);
                load_Amount = data_get.Amount;
            } else {
                localStorage.removeItem('token');
            }
            console.log('Success:', data_get);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // console.log(data);
    if(deposit === "" ){
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }else if(deposit < 0){
        alert("ไม่ได้สามารถฝากเงินได้ โปรดตรวจสอบอีกครั้ง");
    } else{
        let remain = load_Amount - deposit;
        let data = {Remain : remain , Action : 'deposit' , Amount : deposit}
        console.log("res")
        fetch('/transaction_db', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'ok') {
                alert('ฝากเงินเสร็จสิ้น')
            }else{
                alert('ERROR!');
            }
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}