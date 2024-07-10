"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  LabelList,
  PieChart,
  Pie,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SaleChartProps {
  data: {
    name: string;
    total: number;
  }[];
  type: "bar" | "diagram";
}

const colors = ["#2563eb", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

const SaleChart = ({ data, type }: SaleChartProps) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.total,
  }));

  const chartConfigBar = {
    value: {
      label: "Ventes (€)",
    },
  } satisfies ChartConfig;
  const chartConfigDiagram = {
    value: {
      label: "Cours",
    },
  } satisfies ChartConfig;

  return (
    <div>
      {type === "diagram" ? (
        <div>
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Nombre de cours vendu</CardTitle>
              <CardDescription>
                Sur l&apos;ensemble de mon compte
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfigDiagram}
                className="mx-auto aspect-square max-h-[300px]"
              >
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name">
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" hideLabel />}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      ) : null}
      {type === "bar" ? (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Mes Ventes - en Euro €</CardTitle>
              <CardDescription>Par rapport aux cours</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigBar}>
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="value" radius={8}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default SaleChart;
