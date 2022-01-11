window.onload = function () {
    // 渲染
    let goods = document.getElementById('goods');
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.responseText);
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
                b.innerHTML = '删除';
                b.onclick = delGood;
                d.appendChild(p1);
                d.appendChild(p2);
                d.appendChild(img);
                d.appendChild(document.createElement('br'));
                d.appendChild(b);
                goods.appendChild(d);
            }
        }
    }
    xhr.open('post', '/javaweb/upload/find', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function delGood(e) {
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/javaweb/upload/delete');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('gname=' + e.target.parentElement.id);
    location.href = '/javaweb/goodsManage';
}

function up_file() {
    let img = document.getElementById('img').files[0];
    let form = new FormData();
    // 获取文件的 Base64
    fileByBase64(img, base64 => {
        form.append('gname', gname.value);
        form.append('price', price.value);
        form.append('img', base64);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let result = xhr.responseText;
                if (result === '1') {
                    alert('上传成功！');
                    location.href = '/javaweb/goodsManage';
                } else if (result === '0') {
                    alert('上传失败');
                }
            }
        }
        xhr.open('post', '/javaweb/upload/insert', true);
        xhr.send(form);
    })
    // let img = document.getElementById('img').files[0]
    // console.log(img);
    // var form = new FormData();
    // form.append('img', img);
    //
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //
    //     }
    // }
    // xhr.open('post', '/javaweb/upload', true);
    // xhr.send(form);
}

// 文件转 Base64
const fileByBase64 = (file, callback) => {
    let reader = new FileReader();
    // 传入一个参数对象即可得到基于该参数对象的文本内容
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        // target.result 该属性表示目标对象的DataURL
        callback(e.target.result);
    };
}