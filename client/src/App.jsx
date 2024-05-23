import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import NavBar from "./components/NavBar.jsx";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";


const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      setLoading(true);
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="groww">
        <Spinner animation={"grow"} />
      </div>
    );
  }

  return (
    <BrowserRouter>
     <NavBar /> 
      <AppRouter />
    </BrowserRouter>
  );
});
export default App;
