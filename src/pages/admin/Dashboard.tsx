import { Link } from "react-router-dom"
import { DollarSign, ShoppingBag, TrendingUp, AlertTriangle } from "lucide-react"

import { PageHeader } from "../../components/sample/dashboard/DashBoardShell"
import { StatCard } from "../../components/sample/dashboard/StatCard"
import { RevenueChart } from "../../components/sample/dashboard/RevenueChart"
import { TopSellingList } from "../../components/sample/dashboard/TopSellingList"
import { StatusBadge } from "../../components/sample/dashboard/StatusBadge"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/sample/ui/card"

import { Button } from "../../components/sample/ui/button"
import { Badge } from "../../components/sample/ui/badge"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/sample/ui/table"

import { currency, orders, products } from "../../lib/data"

const Dashboard = () => {
  const lowStock = products.filter((p) => p.stock <= 5)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <PageHeader
        title="Good morning, Kokila"
        description="Here is what's happening across Maison Noir today."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Last 30 days
          </Button>
          <Button size="sm">Export</Button>
        </div>
      </PageHeader>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Sales"
          value={currency(2845200)}
          delta="12.4%"
          trend="up"
          hint="vs last month"
          icon={DollarSign}
        />
        <StatCard
          label="Total Orders"
          value="1,284"
          delta="8.1%"
          trend="up"
          hint="vs last month"
          icon={ShoppingBag}
        />
        <StatCard
          label="Total Profit"
          value={currency(986400)}
          delta="5.6%"
          trend="up"
          hint="vs last month"
          icon={TrendingUp}
        />
        <StatCard
          label="Low Stock Alerts"
          value={String(lowStock.length)}
          delta="2 critical"
          trend="down"
          hint="needs restock"
          icon={AlertTriangle}
        />
      </div>

      {/* CHART + TOP PRODUCTS */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>
                  Revenue against target for the trailing 12 months
                </CardDescription>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-1" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-3" />
                  Target
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <TopSellingList />
          </CardContent>
        </Card>
      </div>

      {/* TABLE + STOCK */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ORDERS */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest activity from your store</CardDescription>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                nativeButton={false}
                render={<Link to="/orders" />}
              >
                View all
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.customer}
                    </TableCell>
                    <TableCell>
                      <StatusBadge shippingStatus={order.status} />
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {currency(order.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* LOW STOCK */}
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>Low Stock Alert</CardTitle>
                <CardDescription>Items running low</CardDescription>
              </div>

              <Badge variant="destructive">{lowStock.length}</Badge>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            {lowStock.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-3 hover:bg-muted/40 transition"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">
                    {product.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.category}
                  </span>
                </div>

                <Badge variant="destructive">
                  {product.stock} left
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Dashboard