import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUser, getLoggedUser } from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import { hiddenLoader, showLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import { setUser, setAllUsers } from "../redux/userSlice";

export function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userSlice);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = async () => {
    let res;
    try {
      dispatch(showLoader());
      res = await getLoggedUser();
      dispatch(hiddenLoader());
      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        toast.error(res.message);
        navigator("/login");
      }
    } catch (error) {
      dispatch(hiddenLoader());
      navigator("/login");
    }
  };

  const getAllUsers = async () => {
    let res;
    try {
      dispatch(showLoader());
      res = await getAllUser();
      dispatch(hiddenLoader());
      if (res.success) {
        dispatch(setAllUsers(res.data));
      } else {
        toast.error(res.message);
        navigator("/login");
      }
    } catch (error) {
      dispatch(hiddenLoader());
      navigator("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loggedUser();
      getAllUsers();
    } else {
      navigator("/login");
    }
  }, []);

  return <>{children}</>;
}
