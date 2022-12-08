import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./ButtonBackToLogin.css";

function ButtonBackToLogin() {
   const navigate = useNavigate();

   const onClickBack = () => {
      navigate("/");
   };

   return (
      <div className="ButtonBackToLogin">
         <Button variant="secondary" onClick={onClickBack}>
            Back
         </Button>
      </div>
   );
}

export default ButtonBackToLogin;
