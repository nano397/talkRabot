/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-28 16:36:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-30 14:19:54
 */
// 输入登录账号
let enterLoginNumber = new verification("txtLoginId", function (val) {
    if (!val) {
        return "请输入账号"

    }
});
// 输入登录密码
let enterLoginPwd = new verification("txtLoginPwd", function (val) {
    if (!val) {
        return "请输入密码"
    }
});

// //输入账号
// let enterNumber = new verification("txtLoginId", function (val){
//     if(!val){
//         return "请输入账号"

//     }
// });
let sumbit = document.querySelector(".user-form")
sumbit.onsubmit = async function (e) {
    e.preventDefault()
    let resp = verification.authenticateInfor(enterLoginNumber, enterLoginPwd)
    // console.log(resp);
    if (resp) {
        let fromDataValue = new FormData(sumbit)
        let response = Object.fromEntries(fromDataValue.entries())
        let data = await login(response)
        console.log(data);
        location.href = "./index.html"

    }
}