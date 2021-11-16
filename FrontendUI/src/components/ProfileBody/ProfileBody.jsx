import { autoCapsFirst } from "../../services/func";
import Survey from "../../features/Survey/Survey";
import BoxTier from "../BoxTier/BoxTier";
import TwoColumnTable from "../TwoColumnTable/TwoColumnTable";
import AccountForm from "../AccountForm/AccountForm";
import { Table } from "react-bootstrap";
import { Chart } from "react-google-charts";

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
        <h2>Select a tier!</h2>
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

  function showPreferences() {
    return (
      <div className="col">
        <h2>Preferences</h2>
        <div className="row">
          <div className="col-4">
            <h3 className="m-4">Platforms</h3>
            {props.preferenceNames.platforms.map((platform) => (
              <p key={platform.id}>{platform.platform_name}</p>
            ))}
          </div>
          <div className="col-4">
            <h3 className="m-4">Publishers</h3>
            {props.preferenceNames.publishers.map((publisher) => (
              <p key={publisher.id}>{publisher.publisher_name}</p>
            ))}
          </div>
          <div className="col-4">
            <h3 className="m-4">Genre</h3>
            {props.preferenceNames.genres.map((genre) => (
              <p key={genre.id}>{genre.genre_name}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function showEditPreferences() {
    return (
      <Survey
        baseURL="http://localhost:8000/api/"
        resetDisplay={props.resetDisplay}
      />
    );
  }

  function getTableColumns(obj) {
    let rows = [];
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        rows.push(key);
      }
    }
    return rows;
  }
  function showCustomers() {
    return (
      <div className="col">
        <p>Number of accounts {props.data.length}</p>
        <Table responsive variant="dark">
          <thead>
            <tr>
              {getTableColumns(props.data[0]).map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.data.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.username}</td>
                <td>{customer.email || "N/A"}</td>
                <td>{customer.first_name || "N/A"}</td>
                <td>{customer.middle_name || "N/A"}</td>
                <td>{customer.last_name || "N/A"}</td>
                <td>{customer.subscription || "N/A"}</td>
                <td>{customer.balance}</td>
                <td>{customer.survey_complete ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  function getTierNumbers(tier) {
  }
  function showSubscriptions(){
      return (
          <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['x', 'Sub Tier'],
            ['Bronze', props.subscriptions.bronze.length],
            ['Silver', props.subscriptions.silver.length],
            ['Gold', props.subscriptions.gold.length],
          ]}
          options={{
            hAxis: {
              title: 'Subscriptions',
            },
            vAxis: {
              title: 'Popularity',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      )

  }

  return (
    <div>
      {/* <h1>{props.view}</h1> */}
      {props.view === "Account" && showAccount()}
      {props.view === "Edit Account" && showEditAccount()}
      {props.view === "Tier" &&
        (props.data.subscription ? showTier() : showTierOptions())}
      {props.view === "Edit Tier" && showTierOptions()}
      {props.view === "Preferences" && showPreferences()}
      {props.view === "Edit Preferences" && showEditPreferences()}
      {props.view === "Billing" && <h2>This is billing page</h2>}
      {props.view === "Customers" && showCustomers()}
      {props.view === "Subscriptions" && showSubscriptions()}
    </div>
  );
};

export default ProfileBody;
