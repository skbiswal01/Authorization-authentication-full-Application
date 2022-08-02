import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';

import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
      setAlert({
        msg : message,
        type : type ,
      });
      setTimeout(()=>{
        setAlert(null)
      },1500);
    }    
  return (
    <>
      
      
          <Router>
          <Navbar/>
          <Alert alert={alert}/>
            <div className="container">
             
              <Routes>

              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
                  <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
                  <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              </Routes>
            </div>
         
          </Router>
        
    </>
  );

}
export default App;