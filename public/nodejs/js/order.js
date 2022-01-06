window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let count = 0;
            let result = JSON.parse(xhr.responseText);
            let chart = result.goods;
            if (!chart) {
                let p = document.createElement('p');
                p.innerHTML = '购物车为空！';
                goods.appendChild(p);
            } else {
                for (let i = 0; i < chart.length; i++) {
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

                                count += parseInt(good.price);
                                d.id = good.gname;
                                p1.innerHTML = '商品名：' + good.gname;
                                p2.innerHTML = '价格：' + good.price;
                                img.src = good.img;
                                d.appendChild(p1);
                                d.appendChild(p2);
                                d.appendChild(img);
                                d.appendChild(document.createElement('br'));
                                goods.appendChild(d);
                            }
                        }
                        document.getElementById('count').innerHTML = '总价格为：' + count;
                    }
                    xhr.open('post', '/nodejs/upload/find', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send('gname=' + chart[i]);
                }
            }
        }
    }
    xhr.open('post', '/nodejs/upload/chart', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}