import { api } from '../utils/api'
const login=(username, password)=>{
    
    return  api.signIn(username,password)
        .then(data=>{
            if(data.status==="failed"){
                console.log("error")
                
            }else{localStorage.setItem("AUTH_TOKEN", JSON.stringify(data.data.access_token))}
            return data
          
        });

};
const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
  };

const getAuthToken=()=>{
    return JSON.parse(localStorage.getItem("AUTH_TOKEN"))
};


export default{
    login,
    logout,
    getAuthToken
}

