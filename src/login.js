// import "../Styles/LoginUi.css";
// import profile from "./../image/a.png";
// import email from "./../image/email.png";
// import pass from "./../image/pass.png";
function LoginUi() {
  return (
    <div className="main">
     <div className="sub-main">
       <div>
         <div>
           <h1>Login Page</h1>
           <div>
             <input type="text" placeholder="user name" className="name"/>
           </div>
           <div className="second-input">
             <input type="password" placeholder="user name" className="name"/>
           </div>
          <div className="login-button">
          <button>Login</button>
          </div>
           
            <p className="link">
              <a href="#">Forgot password ?</a> Or<a href="#">Sign Up</a>
            </p>
           
 
         </div>
       </div>
       

     </div>
    </div>
  );
}

export default LoginUi;