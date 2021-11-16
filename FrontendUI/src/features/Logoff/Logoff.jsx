import { useEffect } from "react";
import { useNavigate } from "react-router";

const Logoff = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear("JWT");
    props.toggleAuth()
    navigate("/");
  }, []);
  return <></>;
};

export default Logoff;
