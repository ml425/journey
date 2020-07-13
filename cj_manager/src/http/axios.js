import axios from 'axios';
import qs from 'qs'

axios.defaults.baseURL = 'http://39.97.107.26:5588/'
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
axios.interceptors.request.use((config)=>{
	if(config.method == 'post'){
		config.data = qs.stringify(config.data,{arrayFormat:'repeat'});
	}
	return config;
})

export default axios;