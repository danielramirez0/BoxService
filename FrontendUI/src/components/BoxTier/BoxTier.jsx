import { autoCapsFirst } from "../../services/func";

const BoxTier = (props) => {

  let borderStyle =
    props.level === "bronze"
      ? "dark"
      : props.level === "silver"
      ? "light"
      : "warning";



  return (
    <div
      className={`card border-${borderStyle} ms-auto me-auto mb-3`}
      style={{ maxWidth: "20rem" }}
    >
      <div className="card-header">
        <h4>{autoCapsFirst(props.level)}</h4>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Monthly Games: {props.gamesPerMonth}
        </li>
        <li className="list-group-item">${props.cost} / Month</li>
        <li className="list-group-item">
          Bonus Accessories: {props.bundledAccessories ? "Yes" : "No"}
        </li>
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => props.updateAccount({ subscription: props.boxId }, 'Tier')}
      >
        Select {autoCapsFirst(props.level)}
      </button>
    </div>
  );
};

export default BoxTier;
