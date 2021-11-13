const NavCard = (props) => {
  return (
    <div className="card mb-4">
      <div className="card-header">{props.title} Details</div>
      <div className="card-body">
        <div className="btn-group-vertical">
          <button
            type="button"
            className="btn btn-link"
            onClick={props.changeDisplay}
          >
            View
          </button>
          <button
            type="button"
            className="btn btn-link"
            onClick={props.showEditForm}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
