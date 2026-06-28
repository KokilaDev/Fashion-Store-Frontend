"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart"
import { monthlyRevenue } from "../../../lib/data"

const config = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  target: { label: "Target", color: "var(--chart-3)" },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <ChartContainer config={config} className="aspect-auto h-72 w-full">
      <AreaChart data={monthlyRevenue} margin={{ left: 4, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v) => `$${v / 1000}k`}
          className="text-xs"
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span
                      className="size-2 rounded-[2px]"
                      style={{
                        backgroundColor: `var(--color-${name})`,
                      }}
                    />
                    {config[name as keyof typeof config]?.label ?? name}
                  </span>
                  <span className="font-medium tabular-nums text-foreground">
                    {`$${Number(value).toLocaleString()}`}
                  </span>
                </div>
              )}
            />
          }
        />
        <Area
          dataKey="target"
          type="monotone"
          stroke="var(--color-target)"
          strokeDasharray="4 4"
          fill="transparent"
          strokeWidth={1.5}
        />
        <Area
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          fill="url(#fillRevenue)"
          strokeWidth={2.5}
        />
      </AreaChart>
    </ChartContainer>
  )
}
