import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import FirebaseContext from "../../context/firebase";
import loginimg from "../../images/login.svg";
import beegram from "../../images/BeeGram.png";
import * as ROUTES from "../../constants/routes";
import { doesUsernameExist } from "../../services/firebase";
const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const isInvalid =
    password === "" ||
    emailAddress === "" ||
    fullname === "" ||
    username === "";
  const handelSignup = async (e) => {
    e.preventDefault();
    setisLoading(true)
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {

        // Creating FireAuth User.
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password); 

          // Update display name in firebase auth .
          await createdUserResult.user.updateProfile({
            displayName:username
          })

          // FIRESTORE USER COLLECTION.
          await firebase.firestore().collection('users').add({
            userId: createdUserResult.user.uid,
            username: username.toLocaleLowerCase(),
            fullname,
            emailAddress:emailAddress?.toLocaleLowerCase(),
            following:[],
            dateCreate: Date.now()
          });
          setisLoading(false)

          history.push(ROUTES.DASHBOARD)
        } catch (error) {
           seterror(error.message)
            setUsername("")
            setFullname("")
            setemailAddress("")
            setpassword("")
            setisLoading(false)

        }
    }else{
      seterror("User name already exists")
    }
  };
  useEffect(() => {
    document.title = "Signup - Beegram";
  }, []);

  return (
    <div className="container flex sm:flex-row flex-col  mx-auto max-w-screen-md items-center justify-center h-screen">
      <div className="flex  w-3/5 sm:m-0 mb-5  justify-center">
        <img src={loginimg} className="" />
      </div>
      <div className="flex  flex-col  sm:w-2/5 w-3/5">
        <div className="flex flex-col justify-center items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center  w-full">
            <img src={beegram} alt="beegram" className=" mt-2 w-6/12 mb-4 " />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handelSignup} method="POST">
            <input
              aria-label="Enter full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            />
            <input
              aria-label="Enter username"
              type="text"
              placeholder="User Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your email address"
              type="email"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setemailAddress(target.value)}
              value={emailAddress}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              onChange={({ target }) => setpassword(target.value)}
              value={password}
            />

            <button
              type="submit"
              disabled={isInvalid || isLoading}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              {isLoading ? (
                <span className="animate-ping h-5 w-5 rounded-full bg-red-400">
                  Signing you up
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-fol w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Already have an account ?
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
