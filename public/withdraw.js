function Withdraw(){
    const [show, setShow] = React.useState(true);
    const [withdrawal, setWithdrawal] = React.useState();
    const [currUser, setCurrUser] = React.useState(0);
    const ctx = React.useContext(UserContext);
  
    function handleWithdrawal() {
      console.log ("Deposit made");
      console.log (ctx.users.length);
      console.log (JSON.stringify(ctx));
      setCurrUser (ctx.users.length - 1);
      let tmpBalance = ctx.users[currUser].balance;
      console.log (typeof tmpBalance);
      console.log ("Current Balance = " + tmpBalance);
      if (withdrawal > tmpBalance) {
        alert ("We are sorry. You do not have enough sand dollars for this withdraw.");
        setWithdrawal(0);
        return;
      }
      if (withdrawal < 0) {
        alert ("Please enter a positive amount.");
        setWithdrawal(0);
        return;
      }
      if (isNaN(withdrawal)) {
        alert ("Please enter a positive numerical amount only.");
        setWithdrawal(0);
        return;
      }
      tmpBalance = tmpBalance - Number(withdrawal);
      console.log ("New Balance = " + tmpBalance);
      ctx.users[currUser].balance = tmpBalance;
  
      setShow(false);
    };
  
    function clearForm(){
      setWithdrawal(null);
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="info"
        header="Withdraw funds from your account"
        body={show ? (  
          <>
          Balance: ${ctx.users[currUser].balance}<br/>
          <br/>
          <input type="input" className="form-control" id="name" placeholder="Enter withdraw amount" value={withdrawal} onChange={e => setWithdrawal(e.currentTarget.value)} /><br/>
          <button type="submit" disabled={!withdrawal} className="btn btn-dark" onClick={handleWithdrawal}>Withdraw</button>
          </>
        ):(
          <>
          <h5>Success</h5>
          Your new balance is: ${ctx.users[currUser].balance}
          <br/>
          <br/>
          <button type="submit" className="btn btn-dark" onClick={clearForm}>Make another withdrawal</button>
          <img src="withdrawdefault-jelly.jpeg" className="img-fluid" alt="Responsive image"/>
          </>
        )}
      />
    )
  
  }
  