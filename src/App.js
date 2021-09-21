import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from './constants/routes' 
const Login = lazy(()=> import('./Screens/Login/Login'));
const Signup = lazy(()=> import("./Screens/Signup/Signup"));
const NotFound = lazy(()=>import("./Screens/NotFound/NotFound"))

const App = () => {
  return <>
  <Router>
    <Suspense fallback={<p>Loading.....</p>}>
    <Switch>
    <Route path={ROUTES.LOGIN} exact component={Login} />
    <Route path={ROUTES.SIGN_UP} exact component={Signup} />
    <Route component={NotFound} />
    </Switch>
    </Suspense>
    
  </Router>
  </>;
};

export default App;
