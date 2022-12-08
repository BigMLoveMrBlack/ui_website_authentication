import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Activate.css";

const urlServiceRestAPIAuthentication =
   process.env.REACT_APP_URL_SERVICE_REST_API_AUTHENTICATION;

function Activate() {
   const { search } = useLocation();
   const navigate = useNavigate();

   const queryParameters = useMemo(() => new URLSearchParams(search), [search]);

   const callbackUseEffect = () => {
      const controller = new AbortController();
      const controllerAbort = () => {
         controller.abort();
      };

      const main = async () => {
         const route = "activate";
         const url = `${urlServiceRestAPIAuthentication}/${route}`;
         const headers = {
            "Content-Type": "application/json",
         };
         const data = {
            username: queryParameters.get("username"),
            jwt: queryParameters.get("jwt"),
         };
         const body = JSON.stringify(data);

         try {
            const response = await fetch(url, {
               // signal: controller.signal,
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
         } catch (error) {
            if (error instanceof Error) alert(error.message);
         }

         navigate("/");
      };

      main();

      return controllerAbort;
   };

   useEffect(callbackUseEffect, [queryParameters, navigate]);

   return (
      <div className="Activate">
         <p>
            The user <strong>{queryParameters.get("username")}</strong> is
            activating...
         </p>
      </div>
   );
}

export default Activate;
