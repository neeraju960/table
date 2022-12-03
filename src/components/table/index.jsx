import React from "react";
import Header from "./header";
import TableX from "./tableX/index";

const Index = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-y-2 px-2">
      <Header />
      <TableX />
    </div>
  );
};

export default Index;
