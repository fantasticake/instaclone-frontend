import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Profile from "../routes/Profile";
import SignUp from "../routes/SignUp";
import { tokenVar } from "../variables";

const Router = () => {
  const token = useReactiveVar(tokenVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}></Route>
        {!token ? <Route path="signup" element={<SignUp />}></Route> : null}
        <Route path="/users/:id" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
