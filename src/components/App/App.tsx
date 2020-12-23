import React from "react";
import { Footer } from "../Footer/Footer";
import { LoginPageStyle, MainComp } from "./styles";
import { Switch, Route, useHistory } from "react-router-dom";
import { Header } from "../Header";

import "./../../css/global.css";
import { SignInForm } from "../Auth/SignInForm";
import { RegForm } from "../Auth/RegForm";
import API from "../../api";
import { ProfileForms } from "../Profile/ProfileForms";

export const App: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <MainComp>
        <Switch>
          <Route path="/login">
            <LoginPageStyle>
              <SignInForm />
            </LoginPageStyle>
          </Route>
          <Route exact path="/registration">
            <LoginPageStyle>
              <RegForm />
            </LoginPageStyle>
          </Route>
          <Route path="/profile">
            <ProfileForms />
          </Route>
          <Route path="/">
            {() => (API.id ? history.push("/profile") : history.push("/login"))}
          </Route>
        </Switch>
      </MainComp>
      <Footer />
    </>
  );
};
