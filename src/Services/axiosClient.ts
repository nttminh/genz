import axios, { AxiosError } from "axios";

// Setup cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzEiLCJIZXRIYW5TdHJpbmciOiIxMS8xMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NzA3MTY4MDAwMDAiLCJuYmYiOjE2NDU5ODEyMDAsImV4cCI6MTY3MDg2NDQwMH0.hImF3FD5ezlSpmo_fyOBeTlwLGcUfxyEeZIRIddaRFE",
  },
});

// Modify type
// axiosClient.get = <T>(url: string, config: AxiosRequestConfig) =>
//   axiosClient.get<any, T>(url, config);

// request interceptor
axiosClient.interceptors.request.use((config) => {
  // config là nội dung của request
  // ta có thể thay đổi nội dung của request trước khi nó được gửi lên server
  if (config.headers) {
    config.headers.demo = "FE71";
  }

  return config;
});

// response interceptor
axiosClient.interceptors.response.use(
  (reponse) => {
    // request thành công
    // thay đổi format của reponse trước khi trả ra cho nơi gọi request
    return reponse.data.content;
  },
  (error: AxiosError<{ content: string }>) => {
    // request thất bại
    // thay đổi format của error trước khi trả ra cho nơi gọi request
    return error.response?.data?.content;
  }
);

export default axiosClient;
