import { default as React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { AllTopics, Header, Home, SignIn, SignUp, Topic } from './components';
import AllUsers from './components/UsersComponents';

function App() { 
  return ( 
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/signUp' exact component={SignUp} />
          <Route path='/home' exact component={Home} />
          <Route path='/users' exact component={AllUsers} />
          <Route path='/topics' exact component={AllTopics} />
          <Route path='/topic/:topicId' exact component={Topic} />
        </Switch>
      </div>
    </BrowserRouter> 
  );
}

export default App;

 
