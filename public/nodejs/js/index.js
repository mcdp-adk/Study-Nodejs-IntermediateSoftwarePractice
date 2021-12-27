window.onload = function () {
    // 登陆验证
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.uname) {
                let p = document.createElement('p');
                let a = document.createElement('a');
                p.innerHTML = result.uname + ' 欢迎登陆!';
                a.innerHTML = '退出';
                a.href = '/nodejs/login';
                a.onclick = function () {
                    let xhr = new XMLHttpRequest();
                    xhr.open('get', '/nodejs/user/logout', true);
                    xhr.send();
                }
                document.getElementById('isLog').appendChild(p);
                document.getElementById('isLog').appendChild(a);
            } else {
                let a1 = document.createElement('a');
                let a2 = document.createElement('a');
                a1.innerHTML = '去注册';
                a2.innerHTML = '去登录';
                a1.href = '/nodejs/register';
                a2.href = '/nodejs/login';
                document.getElementById('isLog').appendChild(a1);
                document.getElementById('isLog').appendChild(document.createElement('br'));
                document.getElementById('isLog').appendChild(a2);
            }
        }
    }
    xhr.open('post', '/nodejs/user/isLog', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}