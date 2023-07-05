import "./App.css";
import image from "./user.png"
import { useEffect, useState } from "react";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setUser({ name: result.user.displayName, email: result.user.email });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const updateHight = () => {
    const ele = document.getElementById("chat");
    if (ele) {
      ele.scrollTop = ele.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHight();
      }, 100);
    });
  }, []);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });

    setMsg("");
  };

  return (
    <div>
      {user.email ? null : (
        <div className="inputNameContainer">
          {/* <button onClick={() => googleLogin()}>
          </button> */}

          <div class="google">
            <i class="fab fa-google">
              <button onClick={() => googleLogin()}>Sign in With Google</button>
            </i>

            <i class="fab fa-google">
              <button onClick={() => googleLogin()}>Sign in With Google</button>
            </i>
            
          </div>

        </div>
      )}
      {user.email ? (
        <div>
          <h3 className="userName">
            <img src={image} alt="logo" />
            {user.name}
          </h3>
          <div id="chat" className="chat-container">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`container ${
                  chat.user.email === user.email ? "me" : ""
                }`}
              >
                <div className="chatbox">
                  <div className="user">{chat.user.name}</div>
                  <div className="msg">{chat.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sendbox">
            <input
              type="text"
              placeholder="Message"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button onClick={(e) => sendChat()}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
