import {
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ActionDialog from './commons/components/Modal/ActionDialog';
import ActionLoading from './commons/components/Loading/ActionLoading';
import { useEffect } from "react";
import firebase from './firebase';
import { useDispatch } from "react-redux";
import { setUser, clearUser } from './redux/actions/user_action';
import Navigation from "./commons/components/Navigation/Navigation";
import PublicPage from "./components//PublicPage/PublicPage";
import PrivatePage from "./components/PrivatePage/PrivatePage";
import CommonPage from "./components/CommonPage/CommonPage";

function App() {
  console.log('app');
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        //logined
        dispatch(setUser(user));
        //history.push('/');
      } else {
        //not logined
        dispatch(clearUser());
        //history.push('/login');
      }
    });
  }, []);

  return (
    <div id='app'>
      <Navigation />
      <ActionLoading />
      <ActionDialog />
      <div id='main'>
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/public" component={PublicPage} />
            <Route path="/private" component={PrivatePage} />
            <Route path="/common" component={CommonPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
