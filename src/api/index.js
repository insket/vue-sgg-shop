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