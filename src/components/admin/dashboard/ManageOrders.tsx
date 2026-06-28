"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { PageHeader } from "../dashboard/DashBoardShell"
import { StatusBadge } from "../dashboard/StatusBadge"
import { Card, CardContent } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { 
    currency,
    type AdminOrder, 
    type OrderStatus 
} from "../../../types/Order"

const statuses: OrderStatus[] = ["Pending", "Shipped", "Delivered", "Cancelled"]
const tabs = ["all", ...statuses] as const

// function initials(name: string) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
// }

export function OrdersManager() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [tab, setTab] = useState<(typeof tabs)[number]>("all")

  const filtered = useMemo(
    () => (tab === "all" ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab]
  )

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    )
    toast.success(`${id} marked as ${status}.`)
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: orders.length }
    statuses.forEach((s) => {
      map[s] = orders.filter((o) => o.status === s).length
    })
    return map
  }, [orders])

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
            title="Orders"
            description="Track and fulfill customer orders across their lifecycle."
        />

        <div className="flex">
            <Tabs
                value={tab}
                onValueChange={(v) => setTab(v as (typeof tabs)[number])}
            >
                <TabsList className="gap-1 p-1">
                    {tabs.map((t) => (
                        <TabsTrigger key={t} value={t} className="capitalize px-3 py-1.5">
                        {t === "all" ? "All" : t}
                        <span className="ml-1.5 text-xs text-muted-foreground">
                            {counts[t] ?? 0}
                        </span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>

        <Card className="shadow-sm">
            <CardContent className="p-0">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="h-12">
                            <TableHead className="pl-6">Order</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-center">Items</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Shipping Status</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead className="pr-6 text-right">Update</TableHead>
                            <TableHead className="pr-6 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((order) => (
                        <TableRow key={order._id} className="h-14">
                            <TableCell className="pl-6 font-medium">
                                {order._id}
                            </TableCell>
                            <TableCell>
                            <div className="flex items-center gap-3 py-2">
                                <div className="flex flex-col leading-tight">
                                    <span className="text-sm font-medium">
                                        {order.billingDetails.fullName}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {order.billingDetails.email}
                                    </span>
                                </div>
                            </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-center tabular-nums">
                                {order.items.length}
                            </TableCell>
                            <TableCell className="text-right font-medium tabular-nums">
                                {currency(order.total)}
                            </TableCell>
                            <TableCell>{order.paymentMethod}</TableCell>
                            <TableCell>
                                {order.paymentStatus === "Paid" 
                                    ? "Paid"
                                    : "Pending"}
                            </TableCell>
                            <TableCell>
                                <StatusBadge shippingStatus={order.status} />
                            </TableCell>
                            <TableCell>{order.billingDetails.phone}</TableCell>
                            <TableCell className="pr-6">
                                <div className="flex justify-end">
                                    <Select
                                        value={order.status}
                                        onValueChange={(v) =>
                                            updateStatus(order._id, v as OrderStatus)
                                        }
                                    >
                                        <SelectTrigger size="sm" className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                            {statuses.map((s) => (
                                                <SelectItem key={s} value={s}>
                                                {s}
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">
                    No orders in this category.
                </p>
            ) : null}
            </CardContent>
        </Card>
      </div>
    </>
  )
}
