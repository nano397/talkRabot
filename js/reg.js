/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-28 16:36:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-30 14:32:09
 */
// 输入账号
let enterLoginNumber = new verification("txtLoginId", async function (val) {
    if (!val) {
        return "请输入账号"
    }
    // true则代表该账号存在，false则代表该账号不存在
    let data = await verify(val)


    if (data.data) {
        return "该账号已经存在"
    }

});
// 输入昵称
let enterNickName = new verification("txtNickname", function (val) {
    if (!val) {
        return "请输入昵称"
    }
});

//输入密码
let enterNumber = new verification("txtLoginPwd", function (val) {
    if (!val) {
        return "请输入密码"

    }
});
//再次输入密码
let enterNumberAgain = new verification("txtLoginPwdConfirm", function (val) {
    if (!val) {
        return "请再输入一次密码"

    }
    if (val !== enterNumber.inputValue) {
        return "请密码输入一致"
    }
});


let sumbit = document.querySelector(".user-form")

sumbit.onsubmit = async function (e) {
    e.preventDefault()
  let resp= await verification.authenticateInfor(enterLoginNumber, enterNickName, enterNumber, enterNumberAgain)
    // console.log(resp);
    if(resp){
        let fromDataValue = new FormData(sumbit);
        let data = Object.fromEntries(fromDataValue.entries())
        // console.log(data);
       let response= await register(data)
    //    console.log(response);
    location.href = baseURL+"/login.html"
       
        
        
    }
    
}