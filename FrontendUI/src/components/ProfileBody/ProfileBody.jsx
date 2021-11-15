import { autoCapsFirst } from "../../services/func";
import BoxTier from "../BoxTier/BoxTier";
import TwoColumnTable from "../TwoColumnTable/TwoColumnTable";
import AccountForm from "../AccountForm/AccountForm";

const ProfileBody = (props) => {
//   let currentBox;
//   if (props.data.subscription) {
//     currentBox = props.boxTiers.filter((box) => {
//       return box.id === props.data.subscription;
//     })[0];
//   }

  function showAccount() {
    let tableData = [
      { name: "User Name", value: props.data.username },
      { name: "First Name", value: props.data.first_name },
      { name: "Middle Name", value: props.data.middle_name },
      { name: "Last Name", value: props.data.last_name },
      { name: "Email Address", value: props.data.email },
      { name: "Account Balance", value: props.data.balance },
    ];
    let tableMessage = "Here are your account details";
    return (
      <div className="">
        <h3>Hello {props.data.first_name}!</h3>
        <TwoColumnTable
          tableMessage={tableMessage}
          data={tableData}
          headerOne="Record"
          headerTwo="Detail"
        />
      </div>
    );
  }

  function showEditAccount() {
    let formData = [
      {
        inputId: "username",
        labelText: "Username",
        inputType: "text",
        placeholder: props.data.username,
      },
      {
        inputId: "first_name",
        labelText: "First Name",
        inputType: "text",
        placeholder: props.data.first_name,
      },
      {
        inputId: "middle_name",
        labelText: "Middle Name",
        inputType: "text",
        placeholder: props.data.middle_name,
      },
      {
        inputId: "last_name",
        labelText: "Last Name",
        inputType: "text",
        placeholder: props.data.last_name,
      },
      {
        inputId: "email",
        labelText: "Email Address",
        inputType: "text",
        placeholder: props.data.email,
      },
    ];
    return (
      <AccountForm
        formCallback={props.updateAccount}
        data={formData}
        legend="Update one or more fields"
        buttonText="Submit"
      />
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
      {props.view === "Edit Account" && showEditAccount()}
      {props.view === "Tier" &&
        (props.data.subscription ? showTier() : showTierOptions())}
      {props.view === "Edit Tier" && showTierOptions()}
      {props.view === "Preferences" && <h2>This is preferences page</h2>}
      {props.view === "Billing" && <h2>This is billing page</h2>}
    </div>
  );
};

export default ProfileBody;
