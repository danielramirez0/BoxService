import { useEffect } from "react";
import { autoCapsFirst } from "../../services/func";

import BoxTier from "../BoxTier/BoxTier";

const ProfileBody = (props) => {
  let currentBox;
  if (props.data.subscription) {
    currentBox = props.boxTiers.filter((box) => {
      return box.id === props.data.subscription;
    })[0];
  }

  function showAccount() {
    return (
      <div className="">
        <h3>Hello {props.data.first_name}!</h3>
        <p>Here are your account details</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Record</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-dark">
              <th scope="row">User Name</th>
              <td>{props.data.username}</td>
            </tr>
            <tr className="">
              <th scope="row">First Name</th>
              <td>{props.data.first_name}</td>
            </tr>
            <tr className="table-dark">
              <th scope="row">Middle Name</th>
              <td>{props.data.middle_name}</td>
            </tr>
            <tr className="">
              <th scope="row">Last Name</th>
              <td>{props.data.last_name}</td>
            </tr>
            <tr className="table-dark">
              <th scope="row">Email Address</th>
              <td>{props.data.email}</td>
            </tr>
            <tr className="">
              <th scope="row">Account Balance</th>
              <td>${props.data.balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  function showTier() {
    let tier = props.boxTiers[props.data.subscription - 1];
    return (
      <div className="mt-auto">
        <h2 className="mt-4 mb-4">{autoCapsFirst(tier.level)}</h2>
        <h3 className="">
          You have access to {tier.games_per_month} game(s) per month
        </h3>
        <small className="mb-4">Uprage for more!</small>
        <h3 className="mt-4">Your current monthly charges: ${tier.cost}</h3>
        <p>
          {!tier.bundled_accessories
            ? "This tier does not get extra goodies. Upgrade for more!"
            : "Looks like you're getting bundled accessories too!"}
        </p>
      </div>
    );
  }

  function showTierOptions() {
    return (
      <div className="col">
        <h2>You need to select a tier!</h2>
        {props.boxTiers.map((box) => (
          <BoxTier
            key={box.id}
            boxId={box.id}
            level={box.level}
            gamesPerMonth={box.games_per_month}
            cost={box.cost}
            bundledAccessories={box.bundled_accessories}
            updateAccount={props.updateAccount}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>{props.view}</h1>
      {props.view === "Account" && showAccount()}
      {props.view === "Tier" &&
        (props.data.subscription ? showTier() : showTierOptions())}
      {props.view === "Edit Tier" && showTierOptions()}
      {props.view === "Preferences" && <h2>This is preferences page</h2>}
      {props.view === "Billing" && <h2>This is billing page</h2>}
    </div>
  );
};

export default ProfileBody;
