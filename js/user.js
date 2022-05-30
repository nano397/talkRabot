/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-28 16:35:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-28 22:14:14
 */
// 用于验证登录和注册的js
// import {$, $$, $$$} from "./common"
// $  是获取元素
// $$ 是获取所有元素
// $$$ 是创造一个元素
class verification{
    constructor(inputId,callback){
        //获取该input的元素和它的兄弟元素
        this.input = $(inputId);
        this.callback = callback
        
        


        this.err = this.input.nextElementSibling
        // 当他失去焦点后，然后出发验证函数
        this.input.onblur = ()=>{this.verify()}
    }
    async verify(){
        // console.log('验证啦');
        // 如果该input没有值，那么就报错，请输入账号
        this.inputValue = this.input.value
       let data = await this.callback(this.inputValue)
        if(data){
            // 如果有值的话，那么就代表登录错误
            this.err.innerText = data
            return false
        }
        return true
        
    }
    // 自动验证信息
    static async authenticateInfor(...arg){
        // console.log(arg);
        // 我懂了  你只是把这个promise传了进来，但是你却并没有将promise这个调用
        // 对的呀  如果你调用callback的话  你要传入值的呀，没有传入值，那么不就为false
        let resp = arg.map(item => item.verify())
        // console.log(resp);
        let result = await Promise.all(resp)  //等到所有promise的返回结果
        // console.log(result);
        let data = result.every(i => {
            return i  //都为true就返回true  有一个为false就全都返回false
        })
        return data
        

        // 现在是要用到
        
        
    }
}



