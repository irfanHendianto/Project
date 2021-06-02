import {Route, Redirect} from "react-router-dom";


function ProtectedRouter ({user:user, component:Component, ...rest}){
    return(
        <Route {...rest} render={(props)=>{ if(user !== null ){ return (<Component/>); } else { return (<Redirect to={{ pathname: "/Login", state: {from: props.location}}} />);}}}/>
    );
}

function ProtectedRouterLogin ({user:user, component:Component, ...rest}){
    return(
        <Route {...rest} render={(props)=>{ if(user === null){ return (<Component/>); } else { return (<Redirect to={{ pathname: "/", state: {from: props.location}}} push={true}/>);}}}/>
    );
}

export {ProtectedRouter, ProtectedRouterLogin};