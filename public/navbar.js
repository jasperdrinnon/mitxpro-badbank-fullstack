//to do: The email address or username appears at the top right corner when logged in

function NavBar(){
    return(
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#/home/">Jellyfish Bank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/" title="Create an account with us!">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/login/" title="Login to your account">Login</a>
            </li> 
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/" title="Make a deposit into your account.">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/" title="Withdraw from your account.">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/" title="View all data.">AllData</a>
            </li>           
          </ul>
          {/* { <span class="navbar-text">
            ({ctx.users.name})
            </span>}  */}
        </div>
      </nav>
      </>
    );
  }