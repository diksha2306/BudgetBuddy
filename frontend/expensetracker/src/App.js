import { useMemo, useState } from "react";
import Orb from "./Components/Orb/Orb";
import { useGlobalContext } from "./context/globalContext";
import { MainLayout } from "./styles/Layouts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import MyExpensesScreen from "./screens/MyExpensesScreen";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <main>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/login" Component={LoginScreen} />
            <Route path="/register" Component={RegisterScreen} />
            <Route path="/myexpenses" Component={MyExpensesScreen} />
          </Routes>
        </main>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
