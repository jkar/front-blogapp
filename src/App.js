import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Notification from "./Components/Notification/Notification";
import Main from "./Components/Main";
import Blog from './Components/Blog/Blog';
import LogIn from "./Components/LogIn/LogIn";
import base_url  from './API';

function App() {
  
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getBlogs = async () => {
    const data = await axios.get(`${base_url}/blog/blogs`);
    setBlogs(data.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };


  return (
    <div className="App">
      {blogs.length !== 0 ? 
      <div>
        <Header blogs={blogs} user={user} logOut={logOut} />
        <Switch>
          <Route key={blogs.length} exact path='/' component={()=> <Main />} />
          <Route path='/login' component={()=> <LogIn setUser={setUser} /> } />
          <Route path="/blog/:id" component={() => <Blog blogs={blogs} user={user} setMessage={setMessage} setErrorMessage={setErrorMessage} /> } />
        </Switch>
        <Notification message={message} errorMessage={errorMessage} />  
      </div>
        : 
        null}
    </div>
  );
}

export default App;
