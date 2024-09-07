"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip, Cell, Label } from "recharts";
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

export const description = "A donut chart with text";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const chartConfig = {
  numberOfDoctors: {
    label: "Number of Doctors",
  },
  Cardiologie: {
    label: "Cardiologie",
    color: "hsl(var(--chart-1))",
  },
  Neurologie: {
    label: "Neurologie",
    color: "hsl(var(--chart-2))",
  },
  Oncologie: {
    label: "Oncologie",
    color: "hsl(var(--chart-3))",
  },
  Pédiatrie: {
    label: "Pédiatrie",
    color: "hsl(var(--chart-4))",
  },
  "Médecine Générale": {
    label: "Médecine Générale",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface SpecialtyDonutChartProps {
  hospitalData: {
    doctorSpecialties: Array<{
      specialty: string;
      numberOfDoctors: number;
      satisfactionRate: string;
    }>;
  };
}

export function SpecialtyDonutChart({
  hospitalData,
}: SpecialtyDonutChartProps) {
  const chartData = hospitalData.doctorSpecialties;

  const totalDoctors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.numberOfDoctors, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Specialty Donut Chart</CardTitle>
        <CardDescription>Number of Doctors by Specialty</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 shadow-md">
                      <p>{`${payload[0].name}: ${payload[0].value} doctors`}</p>
                      <p>{`Satisfaction Rate: ${payload[0].payload.satisfactionRate}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="numberOfDoctors"
              nameKey="specialty"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDoctors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Doctors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total number of doctors by specialty
        </div>
      </CardFooter>
    </Card>
  );
}
