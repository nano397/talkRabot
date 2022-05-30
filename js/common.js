/*
 * @Descripttion: 
 * @version: 
 * @Author: congsir
 * @Date: 2022-05-28 17:35:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-29 13:56:10
 */
// 获取单个元素
function $ (id){
    return document.querySelector("#"+id)
}
// 获取class元素
function $$ (value){
    return document.querySelector("."+value)
}
// 创建一个元素
function $$$(targetElem){
    return document.createElement(targetElem)
}