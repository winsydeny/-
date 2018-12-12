import axios from 'axios'
import { Message,Loading } from 'element-ui'
import router from './router'


let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:'Loading...',
        background:'rgba(0,0,0,.7)'
    });
}

function endLoading(){
    loading.close();
}
// 请求拦截
axios.interceptors.request.use(config => {
    // loading animation
    startLoading();
    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},err => {return Promise.reject(err)});

// 响应拦截
axios.interceptors.response.use(response => {
    //endloading animation
    endLoading();
    return response
},err => {
    //error message
    endLoading();
    Message.error(err.response.data);

    // 获取错误状态码
    const { status } = err.response;
    if(status == 401){
        Message.error('token lost,please login again!');
        localStorage.removeItem('eleToken');
        // 跳转登陆界面
        router.push('/login');
    }
    return Promise.reject(err);
})
export default axios;