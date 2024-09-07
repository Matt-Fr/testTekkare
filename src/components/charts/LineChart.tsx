import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
export const description = "A line chart";

interface HospitalData {
  name: string;
  location: string;
  overview: {
    totalPatients: number;
    satisfactionRate: string;
    totalTreatments: number;
    numberOfDoctors: number;
    numberOfNurses: number;
  };
  monthlyHospitalizations: Array<{
    month: string;
    year: number;
    value: number;
  }>;
}

interface LineChartProps {
  hospitalData: HospitalData;
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineGraph({ hospitalData }: LineChartProps) {
  console.log(hospitalData);
  const chartData = hospitalData.monthlyHospitalizations.map((entry) => ({
    month: `${entry.month} ${entry.year}`,
    value: entry.value,
  }));
  console.log(chartData);

  const firstMonthYear = chartData[0].month;
  const lastMonthYear = chartData[chartData.length - 1].month;

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Monthly Hospitalizations</CardTitle>
        <CardDescription>{`${firstMonthYear} - ${lastMonthYear}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={["dataMin - 500", "dataMax + 500"]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
