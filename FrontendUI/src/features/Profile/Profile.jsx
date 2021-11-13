import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import NavCard from "../../components/NavCard/NavCard";
import { getUser, updateUser } from "../../services/user";
import ProfileBody from "../../components/ProfileBody/ProfileBody";
import { getAllObjectsAt } from "../../services/API";

const Profile = (props) => {
  const [accountData, setAccountData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [display, setDisplay] = useState("Account");
  const [boxTiers, setBoxTiers] = useState([]);

  useEffect(() => {
    setLoading(true);
    let userId = jwtDecode(localStorage.getItem("JWT")).user_id;
    onLoad(userId);
  }, []);

  useEffect(() => {
    renderComponent(display);
  }, [display]);

  async function onLoad(id) {
    let account = await getUser(`${props.baseURL}auth/user/?user=${id}`);
    let boxTiers = await getAllObjectsAt(`${props.baseURL}box/all/`);
    setAccountData(account.data);
    setBoxTiers(boxTiers);
    setLoading(false);
  }

  async function updateAccount(data, redirect) {
    let newData = { ...accountData };
    for (const key in data) {
      const value = data[key];
      newData[key] = value;
    }
    let updatedAccount = await updateUser(
      `${props.baseURL}auth/user/?user=${accountData.id}`,
      newData
    );
    await setAccountData(updatedAccount.data);
    setDisplay(redirect)
  }

  function renderComponent() {
    return (
      <ProfileBody
        data={accountData}
        view={display}
        boxTiers={boxTiers}
        updateAccount={updateAccount}
      />
    );
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="row">
      <div className="col-4">
        <NavCard
          title="Account"
          changeDisplay={() => setDisplay("Account")}
          showEditForm={() => setDisplay("Edit Account")}
        />
        <NavCard
          title="Tier"
          changeDisplay={() => setDisplay("Tier")}
          showEditForm={() => setDisplay("Edit Tier")}
        />
        <NavCard
          title="Preferences"
          changeDisplay={() => setDisplay("Preferences")}
          showEditForm={() => setDisplay("Edit Preferences")}
        />
        <NavCard
          title="Billing"
          changeDisplay={() => setDisplay("Billing")}
          showEditForm={() => setDisplay("Edit Billing")}
        />
      </div>
      <div className="col">{renderComponent()}</div>
    </div>
  );
};

export default Profile;
