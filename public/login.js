//The user can log in with an email address, password, or OAuth2 authentication 
//The user can log out of the account

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6moa1hFdx3fnj3fpdyuqESThXRRZMqt4",
  authDomain: "jellyfish-bank.firebaseapp.com",
  projectId: "jellyfish-bank",
  storageBucket: "jellyfish-bank.appspot.com",
  messagingSenderId: "323783244783",
  appId: "1:323783244783:web:9f93f1668a72dd19ba941a",
  measurementId: "G-GZ5RBYMXCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function Login(props){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setUser={props.setUser} setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      email,
      password
    );
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log(firebaseUser);
        fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            props.setUser(data);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
       //success
      } else {
       //error codes
      }
    });
    promise.catch((e) => console.log(e.message));
  }

  function handleGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        const gmail = encodeURI(result.additionalUserInfo.profile.name);
        console.log(gmail);
        fetch(`/account/login/${gmail}/${gmail}`)
        .then(response => response.text())
        .then(async (text) => {
            try {
                const data = JSON.parse(text);
                props.setStatus('');
                props.setShow(false);
                props.setUser(data);
                console.log('JSON:', data);
            } catch(err) {
              console.log(err);
                props.setStatus(text)
                console.log('err:', text);
                
                const url = `/account/create/${gmail}/${gmail}/${gmail}`;
                await fetch(url);
                const res = await fetch(`/account/login/${gmail}/${gmail}`)
                const text = await res.text();
                const data = JSON.parse(text);
                      props.setStatus('');
                      props.setShow(false);
                      props.setUser(data);
            }
        })
       
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }
  
  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <br/>
    <br/>
    <button type="submit" className="btn btn-light" onClick={handleGoogle}>Google Login</button>
    <button type="submit" className="btn btn-light" onClick={handleLogout}>Logout</button>
  </>);
}

//commented out attempt at auth0
{/*//import auth0 for react sdk
import ReactDOM from 'react-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const auth0Config = {
  domain: 'dev-3nvquk1j8zgx3tn0.us.auth0.com',
  clientId: 'JPUf2RA26hQXuWywe0grKqITA982h05W',
  redirectUri: window.location.origin
};

function LoginForm() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <button type="button" className="btn btn-light" onClick={handleLogin}>
      Login with Auth0
    </button>
  );
}

function Login() {
  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <LoginForm />
      {isAuthenticated && (
        <button type="button" className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

ReactDOM.render(
  <Auth0Provider {...auth0Config}>
    <Login />
  </Auth0Provider>,
  document.getElementById('root')
); */}




//old way that stored locally commented out 
{/*function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  function LoginMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Authenticate again
      </button>
    </>);
  }
  
  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const ctx = React.useContext(UserContext);  
  
    function handle(){
      const user = ctx.users.find((user) => user.email == email);
      console.log(user);
      console.log(email, password);
      if (!user) {
        console.log('one')      
        props.setStatus('Check info and try again!')      
        return;      
      }
      if (user.password == password) {
        console.log('two')            
        props.setStatus('');
        props.setShow(false);
        return;      
      }
      console.log('three')          
      props.setStatus('Check info and try again!');        
    }
  
  
    return (<>
  
      Email<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
     
    </>);
  }

  return (
    <Card
      bgcolor="info"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ); 
}*/}

