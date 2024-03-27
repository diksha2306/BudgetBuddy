import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history("/myexpenses");
    }
  }, [history]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">BudgetBuddy</h1>
              <p className="subtitle">Your Expense Xpert</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <button
                  style={{ height: "50px", width: "180px" }}
                  className="landingbutton"
                >
                  Login
                </button>
              </a>
              <a href="/register">
                <button
                  style={{ height: "50px", width: "180px" }}
                  className="landingbutton"
                >
                  SignUp
                </button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
