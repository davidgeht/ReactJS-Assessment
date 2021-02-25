
import './App.css';
import Login from"./auth/login/index";
import useToken from "./auth/useToken";


function App() {
  const { token,setToken }=useToken();
  if(!token){
    return <Login setToken={setToken}/>
  }
  return (
    <div className="main">

    </div>
  )
  
}

export default App;
