import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import hospitalDataArray from "./data/data_exemple1.json";
import { LineGraph } from "./components/charts/LineChart";
import { CardMainInfo } from "./components/cards/CardMainInfo";
import { SpecialtyDonutChart } from "./components/charts/SpecialtyDonutChart";
import Navbar from "./components/Navbar";

function App() {
  const hospitalData = hospitalDataArray[0];
  console.log(hospitalData);

  return (
    <>
      <Navbar></Navbar>
      <main className=" flex ">
        <LineGraph hospitalData={hospitalData}></LineGraph>
        <CardMainInfo hospitalData={hospitalData}></CardMainInfo>
        <SpecialtyDonutChart hospitalData={hospitalData}></SpecialtyDonutChart>
      </main>
    </>
  );
}

export default App;
