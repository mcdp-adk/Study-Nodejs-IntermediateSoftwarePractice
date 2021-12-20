let uname_check = false;
let uemail_check = false;
let upwd_check = false;

function show_uname() {
    uname_msg.innerHTML = '请输入您的用户名'
}

function show_uemail() {
    uemail_msg.innerHTML = '请输入您的邮箱地址'
}

function show_upwd() {
    upwd_msg.innerHTML = '请输入 8~16 位密码'
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
                    uname_msg.innerHTML = '❌该用户名已被使用';
                    uname_check = false;
                } else if (result === '0') {
                    uname_msg.innerHTML = '✅';
                    uname_check = true;
                }
            }
        }
        xhr.open('post', '/nodejs/user/uname', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send('uname=' + uname.value);
    }
}

function check_uemail() {
    if (/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(uemail.value)) {
        uemail_msg.innerHTML = '✅'
        uemail_check = true;
    } else {
        uemail_msg.innerHTML = '邮箱格式错误'
        uemail_check = false;
    }
}

function check_upwd() {
    if (upwd.value.length < 8) {
        upwd_msg.innerHTML = '密码长度短于 8 位'
        upwd_check = false;
    } else {
        upwd_msg.innerHTML = '✅'
        upwd_check = true;
    }
}

function reg() {
    check_uname();
    check_uemail();
    check_upwd();
    if (uname_check && uemail_check && upwd_check) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = xhr.responseText;
                if (result === '1') {
                    alert('注册成功！');
                    location.href = '/nodejs/login';
                } else if (result === '0') {
                    alert('注册失败');
                }
            }
        }
        xhr.open('post', '/nodejs/user/insert', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        let str = 'uname=' + uname.value + '&uemail=' + uemail.value + '&upwd=' + upwd.value;
        xhr.send(str);
    } else {
        alert('请检查注册信息');
    }
}