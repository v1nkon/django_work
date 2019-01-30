// import fetch from '@/config/fetch'
import axios from '@/config/axios'

/**
 * 登陆
 */

export const login = data => axios('/admin/login', data, 'POST');

/**
 * 我的任务
 */
export const getMyTaskList = (data, isMock) => {
	if( !isMock ) {
		// return axios('/getMyTaskList', data, 'GET')
	}else{
		return [{
				name: '标题1',
				type: '任务',
				isFeed: true,
				unit: '山南网安',
				content: '',
				files: [],
				status: '审批中'
			},
			{
				name: '标题2',
				type: '任务',
				isFeed: true,
				unit: '山南网安',
				content: '',
				files: [],
				status: '完成'
			},
		]
	}
}

/**
 * 任务统计
 */
export const getTaskStat = (data, isMock) => {
	if( !isMock ) {
		// return axios('/getTaskStat', data, 'GET')
	}else{
		return [{
				unit: '拉萨',
				finish: 8,
				plan: 10,
				unfinish: 2,
				total: 12,
			},
			{
				unit: '山南',
				finish: 5,
				plan: 12,
				unfinish: 7,
				total: 19,				
			},
		]
	}
}



/**
 * 情报LIST
 */
export const getInfoList = (data, isMock) => {
	if( !isMock ) {
		return axios('/xzwaqb/pj/api!list.action', data, 'GET')
	}else{
		return [{
				ID: '001',
                ftime: '1540554458',
				title: '王小虎',
				type: '1',
				relIntell: '2',
				status: '审核中',
				area: '001',
				relPerson: ['1','2'],
				relOrg: ['1','2'],
				unit: ['001','002'],
				content: '大家爱看大家萨看见啊就看大家肯定睡觉奥卡等级大家爱看的内裤穿你的金卡教大家',
				origin: '001',
				keyword: '涉毒'
			}, {
				ID: '002',
				ftime: '1540964458',
				title: '王二虎',
				type: '2',
				relIntell: '1',
				status: '审核中',
				area: '002',
				relPerson: ['1'],
				relOrg: ['1'],
				unit: ['002'],
				content: '大家爱看大家萨看见啊就看大家肯定睡觉奥卡等级大家爱看的内裤穿你的金卡教大家',
				origin: '002',
				keyword: '涉黄'
			}, {
				ID: '003',
				ftime: '1541274458',
				title: '王三虎',
				type: '3',
				relIntell: '2',
				status: '审核中',
				area: '003',
				relPerson: ['2'],
				relOrg: ['2'],
				unit: ['001','003'],
				content: '大家爱看大家萨看见啊就看大家肯定睡觉奥卡等级大家爱看的内裤穿你的金卡教大家',
				origin: '003',
				keyword: '盗窃'
			}, {
				ID: '004',
				ftime: '1541684458',
				title: '王四虎',
				type: '1',
				relIntell: '1',
				status: '审核中',
				area: '001',
				relPerson: ['2'],
				relOrg: ['2'],
				unit: ['001'],
				content: '大家爱看大家萨看见啊就看大家肯定睡觉奥卡等级大家爱看的内裤穿你的金卡教大家',
				origin: '001',
				keyword: '斗殴'
			}
		]
	}
}

/**
 * 情报LIST
 */
export const getInfoDetail = (data, isMock) => {
	if( !isMock ) {
		return axios('/xzwaqb/pj/api!get.action', data, 'GET')
	}else{
		return {
			title: '标题2',
			type: '类型2',
			relInfo: '情报1',
			relPerson: '重点人2',
			relOrg: '组织1',
			unit: '单位1',
			content:'dsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasa',
			file: ['1.txt']
		}
	}
}

/**
 * 情报统计
 */
export const getInfoStat = (data, isMock) => {
	if( !isMock ) {
		// return axios('/getInfoStat', data, 'GET')
	}else{
		return [{
				unit: '拉萨',
				fDep: '舆情、案件',
				adopt: 6,
				collect: 2,
				keep: 8,
				total: 16,
			},
			{
				unit: '山南',
				fDep: '舆情、网侦、特侦',
				adopt: 8,
				collect: 7,
				keep: 7,
				total: 22,				
			},
		]
	}
}


/**
 * 退出
 */

export const signout = () => axios('/admin/singout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => {
	return ''
}

/**
 * api请求量
 */

export const apiCount = date => axios('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => axios('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => axios('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => axios('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => axios('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => axios('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => axios('/admin/all', data);

/**
 * 管理员数量
 */

export const adminCount = () => axios('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => axios('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => axios('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => axios('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => axios('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */

export const addCategory = data => axios('/shopping/addcategory', data, 'POST');


/**
 * 添加食品
 */

export const addFood = data => axios('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => axios('/shopping/v2/restaurant/category');

/**
 * 获取我的报告LIST
 */

export const getReportList = (data, isMock) => {
	if( !isMock ) {
		return axios('/getMyReportList', data, 'GET')
	}else{
		return [{
				name: '标题1',
				intro: '任务1',
				remarks: '已完成',
				isFinish: '是',
				isOver: '否',
				fTime: '2018-05-08'
			},
			{
				name: '标题2',
				intro: '任务2',
				remarks: '进行中',
				isFinish: '否',
				isOver: '是',
				fTime: ''
			},
		]
	}
}

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => axios('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => axios('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => axios('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => axios('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

// export const getFoods = data => axios('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

// export const getFoodsCount = data => axios('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => axios('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => axios('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => axios('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => axios('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */

export const getUserList = data => axios('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => axios('/v1/users/count', data);

/**
 * 获取订单列表
 */

export const getOrderList = data => axios('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => axios('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => axios('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => axios('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => axios('/v1/user/city/count');
