function TableRow(props) {
    console.log (`Rendering Row ${props.key}`);
  
    return (
      <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.password}</td>
        <td>{props.balance}</td>
      </tr>
    )
  }
  