import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/authSlice.js";
import PageLoader from "../ui/PageLoader.jsx";
import { authCheck, csrfCookie } from "../../api/api.js";

const HOAC = ({ children }) => {
  const isAuthCheck = useSelector((state) => state.auth.isAuthCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await csrfCookie();
        const {
          data: { status, data: user },
        } = await authCheck();
        if (status) {
          dispatch(loginAction({ status, user }));
        } else {
          dispatch(loginAction({ status }));
        }
      } catch (e) {
        console.log(e.message);
        dispatch(loginAction({ status: false }));
      }
    };
    checkUser();
  }, []);

  return isAuthCheck ? <>{children}</> : <PageLoader />;
};

export default HOAC;
