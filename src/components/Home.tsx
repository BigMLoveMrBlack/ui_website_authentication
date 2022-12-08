import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Collapse, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

import "./Home.css";

const urlServiceRestAPIAuthentication = process.env.REACT_APP_URL_SERVICE_REST_API_AUTHENTICATION;

function Home() {
   const [fetchData, setFetchData] = useState({
      success: false,
      message: "",
      username: "",
      email: "",
   });
   const [collapsedEditEmail, setCollapsedEditEmail] = useState(false);
   const [collapsedNewPassword, setCollapsedNewPassword] = useState(false);
   const formNewPasswordRef = useRef<HTMLFormElement>(null);
   const formEditEmailRef = useRef<HTMLFormElement>(null);

   const navigate = useNavigate();

   const handlerErrorUsername = (username: string) => {
      const results = {
         success: false,
         error: Error(""),
      };

      if (fetchData.username !== username)
         results.error.message =
            "The username you need to do the request does not match.";

      results.success = true;

      return results;
   };
   const onClickEditEmail = () => {
      setCollapsedEditEmail((currentCollapsedEmail) => !currentCollapsedEmail);
   };
   const onSubmitEditEmail = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const $form = formEditEmailRef.current;

      if (!$form) return;

      const route = "edit";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };
      const data = {
         username: localStorage.getItem("username"),
         email: $form.homeFormEditEmail.value,
      };
      const body = JSON.stringify(data);

      try {
         const errorUsername = handlerErrorUsername(data.username ?? "");

         if (!errorUsername.success) throw errorUsername.error;

         if (data.email === fetchData.email)
            throw Error("The email is not changed.");

         const response = await fetch(url, {
            method: "PUT",
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
         onClickEditEmail();
         setFetchData((currentfetchData) =>
            Object.assign({}, currentfetchData, parsedResponse)
         );
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };
   const onClickNewPassword = () => {
      setCollapsedNewPassword(
         (currentCollapsedEmail) => !currentCollapsedEmail
      );
   };
   const onSubmitNewPassword = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      const $form = formNewPasswordRef.current;

      if (!$form) return;

      const route = "edit";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };
      const data = {
         username: localStorage.getItem("username"),
         password: $form.homeFormNewPassword.value,
      };
      const body = JSON.stringify(data);

      try {
         const errorUsername = handlerErrorUsername(data.username ?? "");

         if (!errorUsername.success) throw errorUsername.error;

         if (data.password !== $form.homeFormConfirmNewPassword.value)
            throw Error(
               'The password you need to change is not matched the field "Confirm New Password".'
            );

         const response = await fetch(url, {
            method: "PUT",
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
         localStorage.removeItem("username");
         localStorage.removeItem("jwt");
         navigate("/");
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };
   const onClickDeleteAccount = async () => {
      const route = "deactivate";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };
      const data = {
         username: localStorage.getItem("username"),
      };
      const body = JSON.stringify(data);

      try {
         const errorUsername = handlerErrorUsername(data.username ?? "");

         if (!errorUsername.success) throw errorUsername.error;

         const response = await fetch(url, {
            method: "PUT",
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
         localStorage.removeItem("username");
         localStorage.removeItem("jwt");
         navigate("/");
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };
   const onClickLogout = async () => {
      const route = "unauthorize";
      const url = `${urlServiceRestAPIAuthentication}/${route}`;
      const headers = {
         "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem("jwt")}`,
      };
      const data = {
         username: localStorage.getItem("username"),
      };
      const body = JSON.stringify(data);

      try {
         const errorUsername = handlerErrorUsername(data.username ?? "");

         if (!errorUsername.success) throw errorUsername.error;

         const response = await fetch(url, {
            method: "PUT",
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
         localStorage.removeItem("username");
         localStorage.removeItem("jwt");
         navigate("/");
      } catch (error) {
         if (error instanceof Error) alert(error.message);
      }
   };

   const callbackUseEffect = () => {
      const controller = new AbortController();
      const controllerAbort = () => {
         controller.abort();
      };

      const main = async () => {
         const route = "verify-authorization";
         const url = `${urlServiceRestAPIAuthentication}/${route}`;
         const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
         };
         const data = {
            username: localStorage.getItem("username"),
         };
         const body = JSON.stringify(data);

         try {
            const response = await fetch(url, {
               // signal: controller.signal,
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
            setFetchData((currentfetchData) =>
               Object.assign({}, currentfetchData, parsedResponse)
            );
         } catch (error) {
            localStorage.removeItem("username");
            localStorage.removeItem("jwt");

            if (error instanceof Error) alert(error.message);

            navigate("/");
         }
      };

      main();

      return controllerAbort;
   };

   useEffect(callbackUseEffect, [navigate]);

   return (
      <div className="Home">
         <label>username</label>
         <span>: </span>
         <strong>{fetchData.username}</strong>
         <br />
         <label>email</label>
         <span>: </span>
         <strong>{fetchData.email}</strong>
         <Button onClick={onClickEditEmail}>
            <FaEdit />
         </Button>
         <br />
         <Collapse in={collapsedEditEmail}>
            <Form ref={formEditEmailRef} onSubmit={onSubmitEditEmail}>
               <Form.Group controlId="homeFormEditEmail">
                  <Form.Label>Edit Email</Form.Label>
                  <Form.Control type="email" placeholder="New Email" required />
               </Form.Group>
               <br />
               <Button variant="secondary" type="submit">
                  Submit
               </Button>
            </Form>
         </Collapse>
         <br />
         <Button onClick={onClickNewPassword}>New Password</Button>
         <br />
         <Collapse in={collapsedNewPassword}>
            <Form ref={formNewPasswordRef} onSubmit={onSubmitNewPassword}>
               <Form.Group controlId="homeFormNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="New Password"
                     required
                  />
               </Form.Group>
               <Form.Group controlId="homeFormConfirmNewPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Confirm New Password"
                     required
                  />
               </Form.Group>
               <br />
               <Button variant="secondary" type="submit">
                  Submit
               </Button>
            </Form>
         </Collapse>
         <br />
         <Button onClick={onClickDeleteAccount}>Delete Account</Button>
         <br />
         <Button onClick={onClickLogout}>Logout</Button>
      </div>
   );
}

export default Home;
