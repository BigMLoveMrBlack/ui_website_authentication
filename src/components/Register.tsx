import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import ButtonBackToLogin from "./ButtonBackToLogin";

import "./Register.css";

const urlServiceRestAPIAuthentication = process.env.REACT_APP_URL_SERVICE_REST_API_AUTHENTICATION;

function Register() {
   const formRef = useRef<HTMLFormElement>(null);

   const navigate = useNavigate();

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const $form = formRef.current;

      if (!$form) return;

      const route = "register";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
      };
      const data = {
         email: $form.registerFormEmail.value,
         username: $form.registerFormUsername.value,
         password: $form.registerFormPassword.value,
      };
      const body = JSON.stringify(data);

      try {
         if (data.password !== $form.registerFormConfirmPassword.value)
            throw Error(
               'The password you need to register is not matched the field "Confirm Password".'
            );

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
         navigate("/");
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };

   return (
      <div className="Register">
         <ButtonBackToLogin />
         <Form ref={formRef} onSubmit={onSubmit}>
            <Form.Group controlId="registerFormEmail">
               <Form.Label>Email</Form.Label>
               <Form.Control type="email" placeholder="Email" required />
            </Form.Group>
            <Form.Group controlId="registerFormUsername">
               <Form.Label>Username</Form.Label>
               <Form.Control type="text" placeholder="Username" required />
            </Form.Group>
            <Form.Group controlId="registerFormPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Form.Group controlId="registerFormConfirmPassword">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
               />
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
}

export default Register;
