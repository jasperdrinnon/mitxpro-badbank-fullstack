function CreateAccount(){
    const { useEffect }           = React;
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isValid, setIsValid]   = React.useState(false);
    const ctx = React.useContext (UserContext);  
  
    const formIsComplete = () => {
      return name.length > 0 || email.length > 0 || password.length > 0;
    };
  
    useEffect(() => {
      const isValid = formIsComplete();
      console.log ("isValid = " + isValid);
      setIsValid(isValid);
    }, [name, email, password]);
  
    function validate (field, label) {
      if (label === 'name') {
        if (!field) {
          setStatus('Error: Missing name');
          setTimeout(() => setStatus(''),3000);
          return false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{2,}$/i.test(field)) {
          setStatus('Error: Invalid name format');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
      }
  
      if (label === 'email') {
        if (!field) {
          setStatus('Error: Missing email address');
          setTimeout(() => setStatus(''),3000);
          return false;       
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(field)) {
          setStatus('Error: Invalid email address');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
      }
  
      if (label === 'password') {
        if (!field) {
          setStatus('Error: Missing password');
          setTimeout(() => setStatus(''),3000);
          return false;
        } else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/i.test(field)) {
          setStatus('Error: Invalid password format (Must contain a minimum of 8 characters and at least one lower case, one upper case and one number 0-9)');
          setTimeout(() => setStatus(''),5000);
          return false;
        }
      }
  
        return true;
    }
  
    function handleCreate(){
      console.log(name,email,password);
      const url = '/account/create/${name}/${email}/${password}';
      (async () => {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
      })();
      setShow(false);
    }    
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="info"
        header="Create an account"
        status={status}
        body={show ? (  
                <>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" disabled={!isValid} className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
    )
  }