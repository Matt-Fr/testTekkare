import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the types for the chart data
interface DepartmentData {
  department: string;
  patientsPerDay: number;
  averageWaitTime: string; // Original type is string
}

interface BarChartsProps {
  hospitalDepartments: DepartmentData[];
}

// Preprocess data to convert averageWaitTime to number
const preprocessData = (data: DepartmentData[]) => {
  return data.map((department) => ({
    ...department,
    averageWaitTime: parseInt(
      department.averageWaitTime.replace(" min", ""),
      10
    ),
  }));
};

const chartConfig = {
  patientsPerDay: {
    label: "Patients per Day",
    color: "hsl(var(--chart-1))",
  },
  averageWaitTime: {
    label: "Average Wait Time (min)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarCharts({ hospitalDepartments }: BarChartsProps) {
  // Preprocess the data here
  const processedData = preprocessData(hospitalDepartments);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Hospital Departments</CardTitle>
        <CardDescription>Showing patient data and wait times</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={processedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis yAxisId="left" orientation="left" dataKey="patientsPerDay" />
            <YAxis
              yAxisId="right"
              orientation="right"
              dataKey="averageWaitTime"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="patientsPerDay"
              fill="var(--color-patientsPerDay)"
              radius={4}
              yAxisId="left"
            />
            <Bar
              dataKey="averageWaitTime"
              fill="var(--color-averageWaitTime)"
              radius={4}
              yAxisId="right"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data Insights <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily patient count and average wait time per department
        </div>
      </CardFooter>
    </Card>
  );
}
