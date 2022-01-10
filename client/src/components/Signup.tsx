import { useRef } from "react";
import { ChangeEvent, FC, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { SignupUserInputType, SignupComponentProps } from "../type";

const Signup: FC<SignupComponentProps> = ({ onSignup }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [userInput, setUserInput] = useState<SignupUserInputType>({
    email: "",
    password: "",
    name: "",
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;
    setUserInput({ ...userInput, [id]: value });
  };

  return (
    <div className="h-full flex justify-center items-center flex-col gap-4">
      <h1 className="font-medium text-2xl">Signup</h1>
      <form className="flex justify-center items-center w-1/2 gap-4 flex-col" onSubmit={onSubmit}>
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
        <div className="flex gap-4 relative w-1/2 h-8">
          <input
            className="outline-none rounded-md flex w-full px-2 text-gray-700"
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            value={userInput.name}
            onChange={onChangeInput}
          />
        </div>
        <div className="flex gap-4 relative w-1/2 h-8 justify-center items-center">
          <button className="outline-none bg-white text-gray-700 px-4 py-1 rounded-lg transition hover:bg-slate-400 hover:text-white">
            회원가입
          </button>
        </div>
      </form>
      <div className="w-1/2 justify-center items-center">
        <div className="w-1/2 flex justify-end mx-auto">
          <Link to="/login" className="text-blue-700 hover:text-blue-900">
            로그인하러가기
          </Link>
        </div>
      </div>
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
    if (userInput.name === "") {
      nameRef.current?.focus();
      return;
    }

    onSignup(userInput);
  }
};

export default Signup;
