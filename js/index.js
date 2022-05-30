/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-29 13:32:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-29 16:51:41
 */
// 第一步判断是否有登录
(async function () {
    let data = await profile()
    console.log(data);
    if (data.code != 0) {
        // 如果不等于0的话就代表没有登录;如果没有登录的话，那么就告诉用户没有登录，再跳转到登录页面
        alert("未登录，或登录已过期")
        // console.log('我没有登录');
        location.href = "/login.html"
        return;

    }
    // 登录了之后，先将用户信息渲染出来，获取用户的信息，我怎么获得到用户的信息呢？在data里
    // 先获取页面上要用到的dom元素
    let doms = {
        aside: {
            nickname: $("nickname"),
            loginId: $("loginId"),

        },
        close: $("close"),
        chatContainer: $$("chat-container"),
        txtMsg: $("txtMsg"),
        formDom: $$("msg-container")


    }
    doms.aside.nickname.innerText = data.data.nickname;
    doms.aside.loginId.innerText = data.data.loginId;

    // 注册关闭事件函数
    doms.close.onclick = async function (e) {
        let data = await logOut();
        location.href = "/login.html"
    }

    function scrollFn() {
        let scrollHieght = doms.chatContainer.scrollHeight
        let domHeight = doms.chatContainer.getBoundingClientRect().height

        doms.chatContainer.scrollTop = scrollHieght - domHeight;
    }

    // 首次渲染页面
    async function init() {
        let response = await getChart()
        console.log(response);
        for (const i of response.data) {
            createChart(i)

        }
        scrollFn();
    }
    await init();

    // 发送信息渲染界面
    doms.formDom.onsubmit = async function (e) {
        e.preventDefault();
        let content =  doms.txtMsg.value;
        // console.log('发送信息了');
        createChart({
            content: content,
            createdAt: new Date(),
            from: data.data.nickname,
            to: null,
            
        })
        doms.txtMsg.value = "";
        scrollFn();
        console.log(content);
        
       let resp =  await sendChart({content})
       console.log(resp);
       
       createChart({
        content: resp.data.content,
        createdAt: resp.data.createdAt,
        from: null,
        to: data.data.nickname,
        
    })
    scrollFn();


    }





    function createChart(obj) {
        let item = $$$("div");
        item.classList.add("chat-item")
        if (obj.from) {
            item.classList.add("me")
        }

        let img = $$$("img");
        img.classList.add("chat-avatar")
        img.src = obj.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg"

        let content = $$$("div");
        content.classList.add("chat-content");
        content.innerText = obj.content;

        let chatData = $$$("div")
        chatData.classList.add("chat-date");
        chatData.innerText = formatData(obj.createdAt)
        // item.appendChild(item)
        item.appendChild(img)
        item.appendChild(content)
        item.appendChild(chatData)
        doms.chatContainer.appendChild(item)

    }

    function formatData(timeValue) {
        let dataTime = new Date(timeValue)
        // console.log(data);
        let year = dataTime.getFullYear();
        let month = (dataTime.getMonth() + 1).toString().padStart(2, "0");
        let data = (dataTime.getDate()).toString().padStart(2, "0");
        let hour = (dataTime.getHours()).toString().padStart(2, "0");
        let minute = (dataTime.getMinutes()).toString().padStart(2, "0");
        let second = (dataTime.getSeconds()).toString().padStart(2, "0");
        return `${year}-${month}-${data} ${hour}:${minute}:${second}`

    }






})()