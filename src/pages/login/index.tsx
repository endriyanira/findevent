import React, { useState } from "react";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from 'react-loader-spinner';
import Image from "next/image";
import styles from "./Login.module.scss";
import Sealand from "../../../public/Sealand.svg";
import Input from "@/components/Input/Input";
import Button from "../../components/Button/Button";
import axios from "axios";
import { ToastContainer, ToastContent, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/store/user/useUser";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const setUser = useUser.use.setUser()
  const login = useUser.use.login()
  const loginSuccess = useUser.use.loginSuccess()
  const loading = useUser.use.loading()

  const handleChangeLoginData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setLoginData({ ...loginData, [key]: e.target.value });
  };

  const notify = (message: ToastContent, type: TypeOptions) => {
    toast(message, {
      type: type,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login()
    try {
      const response = await axios({
        method: "POST",
        url: "/api/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      });
      const {message, data} = response?.data
      setUser(data.user)
      console.log(data.user)
      const role = data.user.id
      notify(message as ToastContent, "success");
      setTimeout(()=>{
        loginSuccess()
        if(role.startsWith("user")){
          router.push("/")
        } else {
          router.push("/admin")

        }
      },2000)

    } catch (error: any) {
      notify(error.response.data.message as ToastContent, "error");
      loginSuccess()
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.LoginWrapper}>
        <Image
            className="text-primary w-[150px] mb-6"
            alt="logo"
            src={Sealand}
            width={100}
            height={50}
          />
        <div className={styles.LoginContent}>
          <h1 className={styles.LoginHeading}>Log In</h1>
          <p className={styles.LoginText}>Log into your Sealand account.</p>
          <form
            className={styles.LoginFormWrapper}
            onSubmit={(e) => handleSubmitLogin(e)}
          >
            <Input
              type="email"
              id="email"
              label="email"
              value={loginData.email}
              name="email"
              placeholder="email"
              onChange={(e) => handleChangeLoginData(e, "email")}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              validation="Please enter a valid email address"
            />
            <Input
              type="password"
              id="password"
              label="password"
              value={loginData.password}
              name="password"
              placeholder="password"
              onChange={(e) => handleChangeLoginData(e, "password")}
              required
            />
            {
              loading ? 
              <div className="flex flex-col w-full justify-center items-center">
                  <ThreeDots 
                      height="80" 
                      width="70"
                      radius="9"
                      color="#3273DC" 
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                  />
              </div>
              : 
              <>
                <Button
                  defaultButton
                  active
                  primary
                  big
                  type="submit"
                  label="Log In"
                />
                <p className={styles.LoginMoreInfo}>
                  {"Don't have an account? "}
                  <a>
                    <span
                      className="font-bold hover:cursor-pointer"
                      onClick={() => router.push("/signup")}
                    >
                      Sign up
                    </span>
                  </a>
                </p>
              </>
            }
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
