import { default as React, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, Home, SignIn, SignUp, Topic } from './components';
import Topics from './components/TopicsComponent';
import AllUsers from './components/UsersComponents';
import UserService from './services/user-service';
function App() {
  const [user ] = useState(UserService.getUSer());
  return (
    <BrowserRouter>
      <div className='App'>
        <Header user={user }/>
        {user !== null ? (
          <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/signUp' exact component={SignUp} /> 
            <Route path='/home' exact component={Home} />
            <Route path='/users' exact component={AllUsers} />
            <Route path='/topics' exact component={Topics} />
            <Route path='/topic/:topicId' exact component={Topic} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={SignIn} />
              <Route path='/signUp' exact component={SignUp} />
              <Route path='/home' exact component={Home} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
