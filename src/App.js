import {
  Switch,
  Route,
  useHistory,
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

function App() {
  console.log('app');
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        //logined
        dispatch(setUser(user));
        history.push('/');
      } else {
        //not logined
        dispatch(clearUser());
        history.push('/login');
      }
    });
  }, []);

  return (
    <>
      <ActionLoading />
      <ActionDialog />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
