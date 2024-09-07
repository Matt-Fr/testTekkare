import { useState } from "react";
import hospitalDataArray from "./data/data_exemple1.json";
import { LineGraph } from "./components/charts/LineChart";
import { CardMainInfo } from "./components/cards/CardMainInfo";
import { SpecialtyDonutChart } from "./components/charts/SpecialtyDonutChart";
import Navbar from "./components/Navbar";
import { BarCharts } from "./components/charts/BarCharts";

function App() {
  const [selectedHospital, setSelectedHospital] = useState(
    hospitalDataArray[0]
  );

  const handleSelectHospital = (hospitalName: string) => {
    const hospital = hospitalDataArray.find((h) => h.name === hospitalName);
    if (hospital) {
      setSelectedHospital(hospital);
    }
  };

  return (
    <>
      <Navbar
        hospitals={hospitalDataArray.map((hospital) => ({
          name: hospital.name,
        }))}
        onSelectHospital={handleSelectHospital}
      />
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto px-4">
        <LineGraph hospitalData={selectedHospital}></LineGraph>
        <CardMainInfo hospitalData={selectedHospital}></CardMainInfo>
        <SpecialtyDonutChart
          hospitalData={selectedHospital}
        ></SpecialtyDonutChart>
        <BarCharts
          hospitalDepartments={selectedHospital.hospitalDepartments}
        ></BarCharts>
      </main>
    </>
  );
}

export default App;
