import { useState } from "react";
import { useAuthContext } from "../store/authStore.ts";
import { Link, useNavigate } from "react-router-dom";
import { login, test } from "../service/authService.ts";

export function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { init } = useAuthContext();
  async function handleSubmit(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await login({ email, password });
      init(res.user);
      // navigate("/");
    } catch (e) {
      setErr(true);
    }
  }
  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <span className={"logo"}>KingPj Chat</span>
        <span className={"title"}>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder={"email"} />
          <input type="password" placeholder={"password"} />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an Account? <Link to={"/register"}>Register</Link>
        </p>
        <button
          onClick={async () => {
            const pong = await test();
            alert(pong);
          }}
        >
          pong
        </button>
      </div>
    </div>
  );
}
