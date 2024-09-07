import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  hospitals: { name: string }[];
  onSelectHospital: (hospitalName: string) => void;
};

const Navbar: React.FC<Props> = ({ hospitals, onSelectHospital }) => {
  return (
    <header className="p-3 flex md:justify-around">
      {/* Buttons for desktop and larger */}
      <div className="hidden md:flex space-x-4">
        {hospitals.map((hospital, index) => (
          <Button
            key={index}
            className="hospital-button"
            onClick={() => onSelectHospital(hospital.name)}
          >
            {hospital.name}
          </Button>
        ))}
      </div>
      {/* dropdown for mobile */}
      <div className="block md:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Hospital</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {hospitals.map((hospital, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => onSelectHospital(hospital.name)}
              >
                {hospital.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
