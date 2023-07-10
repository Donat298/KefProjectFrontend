import { axiosInstance, axiosPrivateInstance } from "./axios";
//import {useAuthStore} from '../stores/auth'
import { watchEffect } from "vue";

export function useApiPrivate(store)  {

//  const authStore = useAuthStore();
  watchEffect(()=>{
    axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if(!config.headers["Authorization"]){
          config.headers["Authorization"] = `Bearer ${store.getters.accessToken}`;
//          config.headers["Authorization"] = `Bearer ${authStore.accessToken}`;
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  
    axiosPrivateInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest.sent){
          prevRequest.sent = true
          try {
            await store.dispatch("refresh");
            prevRequest.headers["Authorization"] = store.getters.accessToken;
            return axiosPrivateInstance(prevRequest)
          } catch (error) {
            return Promise.reject(error)
          }
        }
  
        return Promise.reject(error)
      }
    )
  })

  return axiosPrivateInstance
}


export function useApi(){
  return axiosInstance
}