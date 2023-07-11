function Deposit(){
    const [show, setShow] = React.useState(true);
    const [deposit, setDeposit] = React.useState();
    const [currUser, setCurrUser] = React.useState(0);
    const ctx = React.useContext(UserContext);
  
    function handleDeposit() {
      console.log ("Deposit successful.");
      console.log (ctx.users.length);
      console.log (JSON.stringify(ctx));
      setCurrUser (ctx.users.length - 1);
      let tmpBalance = ctx.users[currUser].balance;
      console.log (typeof tmpBalance);
      console.log ("Current Balance = " + tmpBalance);
      if (deposit < 0) {
        alert ("Please enter positive numbers only.");
        setDeposit(0);
        return;
      }
      if (isNaN(deposit)) {
        alert ("Please enter numerical values only.");
        setDeposit(0);
        return;
      }
      tmpBalance = tmpBalance + Number(deposit);
      console.log ("New Balance = " + tmpBalance);
      ctx.users[currUser].balance = tmpBalance;
  
      setShow(false);
    };
  
    function clearForm(){
      setDeposit(null);
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="info"
        header="Make a deposit"
        body={show ? (
          <>
          Balance: ${ctx.users[currUser].balance}<br/>
          <br/>
          Deposit amount:<br/>
          <input type="input" className="form-control" id="name" placeholder="Enter deposit amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
          <button type="submit" disabled={!deposit} className="btn btn-dark" onClick={handleDeposit}>Deposit</button>
          </>
        ):(
          <>
          <h5>Success</h5>
          Your new balance is: ${ctx.users[currUser].balance}
          <br/>
          <br/>
          <button type="submit" className="btn btn-dark" onClick={clearForm}>Make another deposit</button>
          <img src="depositdefault-jelly.jpeg" className="img-fluid" alt="Responsive image"/>
          </>
        )}
      />
    )
  
  }
  