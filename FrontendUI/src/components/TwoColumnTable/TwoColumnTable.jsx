const TwoColumnTable = (props) => {
  return (
    <div className="">
      <p>{props.tableMessage}</p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">{props.headerOne}</th>
            <th scope="col">{props.headerTwo}</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index} className="table-dark">
              <th scope="row">{item.name}</th>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TwoColumnTable;
