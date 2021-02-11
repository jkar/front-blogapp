import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Main from "./Components/Main";
import Blog from './Components/Blog/Blog';
import base_url  from './API';

function App() {
  
  const [blogs, setBlogs] = useState([]);


  const getBlogs = async () => {
    const data = await axios.get(`${base_url}/blog/blogs`);
    setBlogs(data.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);


  return (
    <div className="App">
      {blogs.length !== 0 ? 
      <div>
        <Header blogs={blogs} />
        <Switch>
          <Route key={blogs.length} exact path='/' component={()=> <Main />} />
          <Route path="/blog/:id" component={() => <Blog blogs={blogs} /> } />
        </Switch>  
      </div>
        : 
        null}
    </div>
  );
}

export default App;
