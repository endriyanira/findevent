import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import Sealand from "../../../public/Sealand.svg";
import axios from "axios";
import {
  ToastContainer,
  ToastContent,
  TypeOptions,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignUp.module.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Navbar from "@/components/Navbar/Navbar";
import { IUserResponse } from "@/interfaces/user";
import { Utils } from "@/utils";

const SignUp = () => {
  const router = useRouter();
  const id = Utils.generateUUID()
  const [signUpData, setLoginData] = useState({ 
    email: "", 
    password: "", 
    firstName:"",
    lastName:"",
  });

  const notify = (message: ToastContent, type: TypeOptions) => {
    toast(message, {
      type: type,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleChangeSignUpData = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setLoginData({ ...signUpData, [key]: e.target.value });
  };

  const handleSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: IUserResponse = await axios({
        method: "POST",
        url: "/api/register",
        headers: { "Content-Type": "application/json" },
        data: {
          ...signUpData,
          id:`user_${id}`
        },
      });
      notify("Account created!" as ToastContent, "success");
      router.push("/login");
    } catch (error: any) {
      notify(error.response.data.message as ToastContent, "error");
    }
  };

  return (
    <div className={styles.SignUpWrapper}>
      <ToastContainer />
      <Image
          className="text-primary w-[150px] mb-6"
          alt="logo"
          src={Sealand}
          width={100}
          height={50}
        />
      <div className={styles.SignUpContent}>
        <h1 className={styles.SignUpHeading}>Sign Up</h1>
        <p className={styles.SignUpText}>Create your new Sealand account.</p>
        <form
          className={styles.SignUpFormWrapper}
          onSubmit={(e) => handleSubmitSignUp(e)}
        >
          <div className="flex flex-row gap-3">
            <Input
              type="text"
              id="firstName"
              label="firtsname"
              value={signUpData.firstName}
              name="firstName"
              placeholder="firstName"
              onChange={(e) => handleChangeSignUpData(e, "firstName")}
              required
            />
            <Input
              type="text"
              id="lastName"
              label="last name"
              value={signUpData.lastName}
              name="lastName"
              placeholder="lastName"
              onChange={(e) => handleChangeSignUpData(e, "lastName")}
              required
            />
          </div>
          <Input
            type="text"
            id="email"
            label="email"
            value={signUpData.email}
            name="email"
            placeholder="email"
            onChange={(e) => handleChangeSignUpData(e, "email")}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
            validation="Please enter a valid email address"
          />
          <Input
            type="text"
            id="password"
            label="password"
            value={signUpData.password}
            name="password"
            placeholder="password"
            onChange={(e) => handleChangeSignUpData(e, "password")}
            required
          />
          <Button
            defaultButton
            active
            primary
            big
            type="submit"
            label="Sign Up"
          />
          <p className={styles.SignUpMoreInfo}>
            Already have an account?{" "}
            <a>
              <span
                className="font-bold hover:cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log In
              </span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
