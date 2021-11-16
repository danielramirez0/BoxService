import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import NavCard from "../../components/NavCard/NavCard";
import { getUser, updateUser } from "../../services/user";
import ProfileBody from "../../components/ProfileBody/ProfileBody";
import { getAllObjectsAt, getDetailAt } from "../../services/API";
import { useNavigate } from "react-router";

const Profile = (props) => {
  const [accountData, setAccountData] = useState({});
  const [preferences, setPreferences] = useState({
    platforms: [],
    publishers: [],
    genres: [],
  });
  const [preferenceNames, setPreferenceNames] = useState({
    platforms: [],
    publishers: [],
    genres: [],
  });
  const [isLoading, setLoading] = useState(false);
  const [display, setDisplay] = useState("Tier");
  const [boxTiers, setBoxTiers] = useState([]);
  const navigate = useNavigate();

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
    if (account.data.survey_complete) {
      let platforms = await getAllObjectsAt(
        `${props.baseURL}surveys/answers/?user=${id}&type=platform`
      );
      let publishers = await getAllObjectsAt(
        `${props.baseURL}surveys/answers/?user=${id}&type=publisher`
      );
      let genres = await getAllObjectsAt(
        `${props.baseURL}surveys/answers/?user=${id}&type=genre`
      );
      let boxTiers = await getAllObjectsAt(`${props.baseURL}box/all/`);
      let platformNames = await getPreferenceName(platforms, "platform");
      let publisherNames = await getPreferenceName(publishers, "publisher");
      let genreNames = await getPreferenceName(genres, "genre");
      let names = {
        platforms: platformNames,
        publishers: publisherNames,
        genres: genreNames,
      };
      setPreferenceNames(names);
      setAccountData(account.data);
      setPreferences({
        platforms: platforms,
        publishers: publishers,
        genres: genres,
      });
      setBoxTiers(boxTiers);
      setLoading(false);
    } else {
      navigate("/survey");
    }
  }

  async function getPreferenceName(arr, type) {
    let names = [];
    for (let i = 0; i < arr.length; i++) {
      let itemId;
      if (type === "platform") {
        itemId = arr[i].platform;
      } else if (type === "publisher") {
        itemId = arr[i].publisher;
      } else {
        itemId = arr[i].genre;
      }
      let result = await getDetailAt(
        `${props.baseURL}games/detail/`,
        itemId,
        type
      );
      names.push(result);
    }
    return names;
  }

  function resetDisplay(redirect) {
      setDisplay(redirect)
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
    setDisplay(redirect);
  }

  function renderComponent() {
    return (
      <ProfileBody
        data={accountData}
        preferences={preferences}
        preferenceNames={preferenceNames}
        view={display}
        boxTiers={boxTiers}
        updateAccount={updateAccount}
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
