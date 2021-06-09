 
import { default as React, useState } from 'react';


const Context = (props) => {
    const [user, setUser] = useState({});
    const Context = React.createContext();
return (
    <Context.Provider value={
    {   user:user,
        setMessage: (value) => this.setUser(value)}}>
        { props.children}
    {/* //this indicates that all the child tags with MyProvider as Parent can access the global store. */}
    </Context.Provider>)
 
}

export default Context;