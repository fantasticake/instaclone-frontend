import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Login from "../routes/Login";
import Post from "../routes/Post";
import Profile from "../routes/Profile";
import SignUp from "../routes/SignUp";
import { tokenVar } from "../variables";

const Router = () => {
  const token = useReactiveVar(tokenVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}></Route>
        {!token ? <Route path="/signup" element={<SignUp />}></Route> : null}
        <Route path="/users/:id" element={<Profile />}></Route>
        <Route path="/posts/:id" element={<Post />}></Route>
        {token ? (
          <Route path="/accounts/edit" element={<EditProfile />}></Route>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
