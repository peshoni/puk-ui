import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { ToastProvider } from 'react-toast-notifications';
import './App.css';
import { AllTopics, CreateTopic, Header, Home, SignIn, SignUp, Topic } from './components';
// import { React, useState } from 'react';

let first = {
  name: 'dharmik',
  age: '21'
}
export { first };

function App() {


  // const [userId, setUserId] = useState();

  return (

    // <ToastProvider>
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>


          <Route path='/' exact component={SignIn} />
          <Route path='/signUp' component={SignUp} />


          <Route path='/home' exact component={Home} />

          <Route path='/topics' exact component={AllTopics} />
          <Route path='/topic/:topicId' component={Topic} />
          <Route path='/addtopic' component={CreateTopic} />
        </Switch>
      </div>
    </BrowserRouter>
    //  </ToastProvider>

  );
}

export default App;
