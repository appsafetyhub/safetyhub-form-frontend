import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./app";
import Created from "./pages/created";
import RepliedForm from "./pages/repliedForm";
import ViewForm from "./pages/viewForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:publicKey" element={<App />}></Route>
        <Route path="/created" element={<Created />}></Route>
        <Route
          path="/view-form/:publicKey/:userPublicKey"
          element={<ViewForm />}
        ></Route>
        <Route
          path="/replied-form/:publicKey"
          element={<RepliedForm />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
