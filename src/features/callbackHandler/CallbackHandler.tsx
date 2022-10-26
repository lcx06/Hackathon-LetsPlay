import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { requestAccesToken } from "store";
import { setTokens } from "app/session";

let apiFetched = false;

// Este componente esta pensado para renderezarse solamente en el modal de autenticación

export const CallbackHandler = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const getTokens = async (code: string) => {
    if (apiFetched) {
      return;
    }

    apiFetched = true;
    try {
      const response = await requestAccesToken(code);
      if (response.access_token && response.refresh_token) {
        setTokens(response.access_token, response.refresh_token);
        window.opener.location.reload();
        window.close();
      } else {
        throw response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    code && getTokens(code);
  }, [code]);

  return <div>Callback</div>;
};
