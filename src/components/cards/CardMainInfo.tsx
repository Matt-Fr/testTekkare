import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

interface Overview {
  totalPatients: number;
  satisfactionRate: string;
  totalTreatments: number;
  numberOfDoctors: number;
  numberOfNurses: number;
}

interface HospitalData {
  name: string;
  location: string;
  overview: Overview;
}

interface CardMainInfoProps {
  hospitalData: HospitalData;
}

export function CardMainInfo({ hospitalData }: CardMainInfoProps) {
  const { name, location, overview } = hospitalData;
  const {
    totalPatients,
    satisfactionRate,
    totalTreatments,
    numberOfDoctors,
    numberOfNurses,
  } = overview;

  const satisfactionValue = parseInt(satisfactionRate.replace("%", ""), 10);

  return (
    <Card className="flex flex-row items-center p-4">
      <div className="flex-1 text-right">
        <CardHeader>
          <CardTitle className=" text-2xl">{name}</CardTitle>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            <strong>Total Patients:</strong> {totalPatients}
          </p>

          <p className="mb-2">
            <strong>Total Treatments:</strong> {totalTreatments}
          </p>
          <p className="mb-2">
            <strong>Number of Doctors:</strong> {numberOfDoctors}
          </p>
          <p className="mb-2">
            <strong>Number of Nurses:</strong> {numberOfNurses}
          </p>
        </CardContent>
        <CardFooter className=" justify-end">
          <p className="mb-2">
            <strong>Satisfaction Rate:</strong> {satisfactionRate}
            <Progress value={satisfactionValue} />
          </p>
        </CardFooter>
      </div>
    </Card>
  );
}
