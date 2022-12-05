import React from "react";
import Header from "./header";
import Logger from "./Logger/index";

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-2 px-2">
      <Header />
      <Logger />
    </div>
  );
};

export default Index;
