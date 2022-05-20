import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Login from "../routes/Login";
import SignUp from "../routes/SignUp";
import { tokenVar } from "../variables";

const Router = () => {
  const token = useReactiveVar(tokenVar);
  return (
    <BrowserRouter>
      {token ? (
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
