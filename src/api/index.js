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