let uname_check = false;
let upwd_check = false;

function show_uname() {
    uname_msg.innerHTML = '请输入您的用户名'
}

function show_upwd() {
    upwd_msg.innerHTML = '请输入您的密码'
}

function check_uname() {
    if (!uname.value) {
        uname_msg.innerHTML = '用户名为空';
        uname_check = false;
    } else {
        // Ajax 异步验证用户名
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = xhr.responseText;
                if (result === '1') {
                    uname_msg.innerHTML = '✅';
                    uname_check = true;
                } else if (result === '0') {
                    uname_msg.innerHTML = '❌该用户名未被注册';
                    uname_check = false;
                }
            }
        }
        xhr.open('post', '/nodejs/user/uname', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('uname=' + uname.value);
    }
}

function check_upwd() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = xhr.responseText;
            if (result === '1') {
                upwd_msg.innerHTML = '✅';
                upwd_check = true;
            } else if (result === '0') {
                upwd_msg.innerHTML = '❌密码错误';
                upwd_check = false;
            }
        }
    }
    xhr.open('post', '/nodejs/user/upwd', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('uname=' + uname.value + '&upwd=' + upwd.value);
}

function log() {
    check_uname();
    check_upwd();
    if (uname_check && upwd_check) {
        alert('登陆成功！')
    } else {
        alert('请检查您的信息');
    }
}