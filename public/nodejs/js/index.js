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

    // 渲染
    let goods = document.getElementById('goods');
    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            let result = JSON.parse(xhr2.responseText);
            for (let i = 0; i < result.length; i++) {
                let good = result[i];
                let d = document.createElement('div');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let img = document.createElement('img');
                let b = document.createElement('button');

                d.id = good.gname;
                p1.innerHTML = '商品名：' + good.gname;
                p2.innerHTML = '价格：' + good.price;
                img.src = good.img;
                b.innerHTML = '加入购物车';
                b.onclick = toChart;
                d.appendChild(p1);
                d.appendChild(p2);
                d.appendChild(img);
                d.appendChild(document.createElement('br'));
                d.appendChild(b);
                goods.appendChild(d);
            }
        }
    }
    xhr2.open('post', '/nodejs/upload/find', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.send();
}

function toChart(e) {
    let xhr = new XMLHttpRequest();
    xhr.open('post','/nodejs/upload/toChart');
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send('gname='+e.target.parentElement.id);
}