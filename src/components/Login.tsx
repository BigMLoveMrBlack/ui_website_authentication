import React, { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import "./Login.css";

const urlServiceRestAPIAuthentication =
   process.env.REACT_APP_URL_SERVICE_REST_API_AUTHENTICATION;

function Login() {
   const formRef = useRef<HTMLFormElement>(null);

   const { search } = useLocation();
   const navigate = useNavigate();

   const queryParameters = useMemo(() => new URLSearchParams(search), [search]);

   const onClickForgetPassword = () => {
      navigate("/forget-account");
   };
   const onClickRegister = () => {
      navigate("/register");
   };
   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const $form = formRef.current;

      if (!$form) return;

      const route = "authorize";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
      };
      const data = {
         username: $form.loginFormUsername.value,
         password: $form.loginFormPassword.value,
      };
      const body = JSON.stringify(data);

      try {
         const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrerPolicy: "no-referrer",
            headers,
            body,
         });

         const parsedResponse = await response.json();

         if (!parsedResponse.success) throw Error(parsedResponse.message);

         alert(parsedResponse.message);
         localStorage.setItem("username", parsedResponse.username);
         localStorage.setItem("jwt", parsedResponse.jwt);
         navigate("/home");
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };

   const callbackUseEffect = () => {
      const main = async () => {
         const username = queryParameters.get("username");
         const jwt = queryParameters.get("jwt");

         if (username && jwt) {
            localStorage.setItem("username", username);
            localStorage.setItem("jwt", jwt);
         }

         if (!localStorage.getItem("username") ?? !localStorage.getItem("jwt"))
            return;

         navigate("/home");
      };

      main();
   };

   useEffect(callbackUseEffect, [queryParameters, navigate]);

   return (
      <div className="Login">
         <Form ref={formRef} onSubmit={onSubmit}>
            <Form.Group controlId="loginFormUsername">
               <Form.Label>Username</Form.Label>
               <Form.Control type="text" placeholder="Username" required />
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
               Login
            </Button>
         </Form>
         <Button variant="secondary" onClick={onClickForgetPassword}>
            Forget Account
         </Button>
         <Button variant="secondary" onClick={onClickRegister}>
            Register
         </Button>
      </div>
   );
}

export default Login;
