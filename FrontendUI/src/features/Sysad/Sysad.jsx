import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import NavCard from "../../components/NavCard/NavCard";
import { getUser, updateUser } from "../../services/user";
import ProfileBody from "../../components/ProfileBody/ProfileBody";
import { getAllObjectsAt, getDetailAt } from "../../services/API";
import { useNavigate } from "react-router";

const Sysad = (props) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [display, setDisplay] = useState("Customers");
  const [boxTiers, setBoxTiers] = useState([]);
  const [subscriptions, setSubscriptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    renderComponent(display);
  }, [display]);

  async function onLoad() {
    setLoading(true);
    let customers = await getAllObjectsAt(`${props.baseURL}sysad/`);
    let subs = await getAllObjectsAt(`${props.baseURL}sysad/subscriptions/`);
    setCustomers(customers);
    setSubscriptions(subs)
    setLoading(false);
  }

  function resetDisplay(redirect) {
    setDisplay(redirect);
  }

  function renderComponent() {
    return (
      <ProfileBody
        data={customers}
        subscriptions={subscriptions}
        // preferences={preferences}
        // preferenceNames={preferenceNames}
        view={display}
        boxTiers={boxTiers}
        // updateAccount={updateAccount}
        resetDisplay={resetDisplay}
      />
    );
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="row">
      <div className="col-4">
        <NavCard
          title="Customers"
          changeDisplay={() => setDisplay("Customers")}
          showEditForm={() => setDisplay("Edit Customers")}
        />
        <NavCard
          title="Subscriptions"
          changeDisplay={() => setDisplay("Subscriptions")}
          showEditForm={() => setDisplay("Edit Subscriptions")}
        />
        <NavCard
          title="Revenue"
          changeDisplay={() => setDisplay("Revenue")}
          showEditForm={() => setDisplay("Edit Revenue")}
        />
        <NavCard
          title="Analytics"
          changeDisplay={() => setDisplay("Analytics")}
          showEditForm={() => setDisplay("Edit Analytics")}
        />
      </div>
      <div className="col">{renderComponent()}</div>
    </div>
  );
};

export default Sysad;
