import axios from "axios";
export default axios.create({
    baseURL: "https://echo-wave.vercel.app/",
    // baseURL: "http://localhost:5000/"
})
