import { useEffect } from "react";

import { requestAuthorization } from "store";

import { useAppSelector, useAppDispatch } from "app/hooks";

export const Login = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.session.status);

  useEffect(() => {
    status === "initial" && dispatch(requestAuthorization());
  }, [status, dispatch]);

  return <div>login</div>;
};
