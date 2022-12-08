import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

import ButtonBackToLogin from "./ButtonBackToLogin";

import "./ForgetAccount.css";

const urlServiceRestAPIAuthentication =
   process.env.REACT_APP_URL_SERVICE_REST_API_AUTHENTICATION;

function ForgetPassword() {
   const formRef = useRef<HTMLFormElement>(null);

   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const $form = formRef.current;

      if (!$form) return;

      const route = "forget-account";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
      };
      const data = {
         email: $form.forgetPasswordFormEmail.value,
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
         $form.reset();
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };

   return (
      <div className="ForgetPassword">
         <ButtonBackToLogin />
         <Form ref={formRef} onSubmit={onSubmit}>
            <Form.Group controlId="forgetPasswordFormEmail">
               <Form.Label>Email</Form.Label>
               <Form.Control type="email" placeholder="Email" required />
            </Form.Group>
            <br />
            <Button variant="secondary" type="submit">
               Send
            </Button>
         </Form>
      </div>
   );
}

export default ForgetPassword;
