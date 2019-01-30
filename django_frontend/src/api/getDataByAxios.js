import axios from '@/config/axios'


//axios('/user/pwd', data, 'PUT');
//http://localhost:8080/xzwaqb


export const getTaskList = ( data = {} ) => {

	if( location.port == '8010' ) {
		return axios( '/api/task/list', data )
	}else{
		return axios( '/xzwaqb/dm/api!list.action' )
	}
}

export const addTask = ( data = {} ) => {

	if( location.port == '8010' ) {
		return axios( '/api/task', data, 'POST' )
	}else{
		return axios( '/xzwaqb/dm/api!list.action' )
	}
}

export const updateTask = ( data = {} ) => {

	if( location.port == '8010' ) {
		return axios( '/api/task/update', data, 'POST' )
	}else{
		return axios( '/xzwaqb/dm/api!list.action' )
	}
}

export const getTaskDetail = id => {
	return {
		title: '标题1',
		type: '类型1',
		status: '0',//0 下发
		feedBack: 0,
		unit: '001',
		content:'dsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasadsasasasasasasasasasasasasasasasa',
		file: ['1.txt']
	}
}