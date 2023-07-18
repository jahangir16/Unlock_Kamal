import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import history from './history'
import { useCustomNavigate } from './Navigate';

const sleep = ()=> new Promise(resolve => setTimeout(resolve,500));

axios.defaults.baseURL = "http://localhost:5017/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
   await sleep();

    return response;
  },
  (error: AxiosError) => {
    // const navigate = useNavigate();
    
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error(data.title);
       
        // navigate("/server-error");
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
  get404Error: () => requests.get("Buggy/not-found"),
  get401Error: () => requests.get("Buggy/unauthorised"),
  get400Error: () => requests.get("Buggy/bad-request"),
  get500Error: () => requests.get("Buggy/server-error"),
  getValidationError: () => requests.get("Buggy/validation-error")
};

const agent = {
  Catalog,
  TestErrors
};


export default agent;
