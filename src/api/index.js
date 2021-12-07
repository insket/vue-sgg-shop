import request from './request'
import mockRequest from './mockRequest'

/*
    三级联动
*/
export const reqCateGoryList = () => {
  return request({
    method: 'get',
    url: '/api/product/getBaseCategoryList'
  })
}

/*
    banner轮播
*/
export const reqBannerList = () => {
  return mockRequest({
    method: 'get',
    url: 'banner'
  })
}

/*
    floor 数据
*/
export const reqFloorList = () => {
  return mockRequest({
    method: 'get',
    url: 'floor'
  })
}

/*
    搜索 数据
*/
export const reqSearchList = (data) => {
  return request({
    method: 'post',
    url: '/api/list',
    data
  })
}

/*
    商品详情 数据
*/
export const reqGoodList = (skuid) => {
  return request({
    method: 'get',
    url: `/api/item/${skuid}`,
  })
}

/*
    将商品添加到购物车 / 更新商品个数
*/
export const reqAddOrUpdataShopCart = (skuId, skuNum) => {
  return request({
    method: 'post',
    url: `/api/cart/addToCart/${skuId}/${skuNum}`,
  })
}

/*
    获取购物车列表
*/
export const reqCartList = () => {
  return request({
    method: 'get',
    url: `/api/cart/cartList`,
  })
}

/*
    删除购物车商品
*/
export const reqDeleteCart = (skuId) => {
  return request({
    method: 'delete',
    url: `/api/cart/deleteCart/${skuId}`,
  })
}

/*
    切换商品选中状态
*/
export const reqCheckStatus = (skuId, isChecked) => {
  return request({
    method: 'get',
    url: `/api/cart/checkCart/${skuId}/${isChecked}`,
  })
}

/*
    获取验证码
*/
export const reqRegisterCode = (phone) => {
  return request({
    method: 'get',
    url: `/api/user/passport/sendCode/${phone}`,
  })
}

/*
    注册
*/
export const reqUserRegister = (data) => {
  return request({
    method: 'post',
    url: `/api/user/passport/register`,
    data
  })
}

/*
    登录
*/
export const reqUserLogin = (data) => {
  return request({
    method: 'post',
    url: `/api/user/passport/login`,
    data
  })
}

/*
    获取用户信息, 携带token
*/
export const reqUserInfo = () => {
  return request({
    method: 'get',
    url: `/api/user/passport/auth/getUserInfo`
  })
}