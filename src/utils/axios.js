import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://expense-tracker-server3.herokuapp.com'
});

export default axiosInstance;
