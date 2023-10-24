import Button from "@/components/Button/Button";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const Customize = () => {
  return (
    <div className="w-[500px] h-[500px] bg-slate-200 justify-center items-center flex flex-col gap-6">
      <Button primary label="Primary" type="button" />
      <Button secondary label="Secondary" type="button" />
    </div>
  );
};

export default Customize;
