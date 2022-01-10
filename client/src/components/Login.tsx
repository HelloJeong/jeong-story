import { useRef } from "react";
import { ChangeEvent, FC, useState, FormEvent } from "react";
import { LoginComponentProps, LoginUserInputType } from "../type";

const Login: FC<LoginComponentProps> = ({ onLogin }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState<LoginUserInputType>({ email: "", password: "" });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setUserInput({ ...userInput, [id]: value });
  };

  return (
    <div className="h-full flex justify-center items-center flex-col gap-4">
      <h1 className="font-medium text-2xl">Login</h1>
      <form className=" flex justify-center items-center w-1/2 gap-4 flex-col" onSubmit={onSubmit}>
        <div className="flex gap-4 relative w-1/2 h-8">
          <input
            className="outline-none rounded-md flex w-full px-2 text-gray-700"
            id="email"
            type="text"
            placeholder="Email"
            ref={emailRef}
            value={userInput.email}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex gap-4 relative w-1/2 h-8">
          <input
            className="outline-none rounded-md flex w-full px-2 text-gray-700"
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            value={userInput.password}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex gap-4 relative w-1/2 h-8 justify-center items-center">
          <button className="outline-none bg-white text-gray-700 px-4 py-1 rounded-lg transition hover:bg-slate-400 hover:text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (userInput.email === "") {
      emailRef.current?.focus();
      return;
    }
    if (userInput.password === "") {
      passwordRef.current?.focus();
      return;
    }

    onLogin(userInput);
  }
};

export default Login;
