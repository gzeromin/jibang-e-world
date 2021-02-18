import {
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Auth from "./hoc/auth";
import ActionModal from './commons/components/Modal/ActionModal';
import ActionLoading from './commons/components/Loading/ActionLoading';

import { Loading, Dialog } from './store';
import Button from 'react-bootstrap/Button';

function App() {
  console.log('app');

  return (
    <>
      <ActionLoading />
      <Button variant="primary" onClick={Dialog.openDialog}>
        Launch vertically centered modal
      </Button>
      <Button variant="primary" onClick={() => Loading.setIsLoading(!Loading.isLoading)}>
        SpinTest
      </Button>
      <ActionModal />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route path="/login" component={Auth(LoginPage, false)} />
        <Route path="/register" component={Auth(RegisterPage, false)} />
      </Switch>
    </>
  );
}

export default App;
