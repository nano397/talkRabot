/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-28 10:21:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-29 09:49:41
 */
let baseUrl = "https://study.duyiedu.com"
let TOKEN_VAL = "token"
// post 请求
async function post(path, userInfo) {
    let userInfoValue = userInfo || {};
    let token = localStorage.getItem(TOKEN_VAL)
    let headers = {
        "Content-Type":"application/json"
    }
    if (token) {
        headers["authorization"] = "Bearer "+ token
    }
    let resp = await fetch(baseUrl + path, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(userInfoValue)
    })
    return resp;
}
// get请求

async function get(path) {
    let pathValue =  path|| "";
    let headers = {};
    let token = localStorage.getItem(TOKEN_VAL)
    if (token) {
        headers["authorization"] = "Bearer "+ token
    }
    let resp = await fetch(baseUrl + pathValue, {
        method: "GET",
        headers
    })
    
    return resp
}

// 注册
async function register(userInfo) {
    let resp = await post("/api/user/reg", userInfo)
    let data = await resp.json();
    return data;

}
// 登录
async function login(logInfo) {
    let resp = await post("/api/user/login", logInfo)
    let data = await resp.json();
    if (data.code === 0) {
        // 登录成功
        let token = resp.headers.get("authorization")
        localStorage.setItem("token", token)
    }

    return data;
    // 如何获取响应头里的authorization
}
// 验证账号
async function verify(accontInfo) {
    accontInfo
    
    let resp = await get("/api/user/exists?loginId="+accontInfo);
    let data = await resp.json();
    
    return data;
}
// 当前登录的用户信息
async function profile() {
    let resp = await get("/api/user/profile");
    let data = await resp.json();
    return data;
}
// 获取聊天信息
async function getChart() {
    let resp = await get("/api/chat/history");
    let data = await resp.json();
    return data;
}
// 发送聊天信息
async function sendChart(message) {
    let resp = await post("/api/chat", message)
    let data = await resp.json();
    return data;
}

// 注销登录
function logOut(){
    return localStorage.removeItem(TOKEN_VAL)
}

// 