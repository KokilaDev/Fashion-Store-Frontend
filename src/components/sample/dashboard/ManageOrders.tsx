"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { PageHeader } from "./DashBoardShell"
import { StatusBadge } from "./StatusBadge"
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
import { getAllOrdersApi, updateOrderStatusApi } from "../../../api/orderApi"
import { Button } from "../ui/button"
import { ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field"

const statuses: OrderStatus[] = ["Pending", "Shipped", "Delivered", "Cancelled"]
const tabs = ["all", ...statuses] as const

export function OrdersManager() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [tab, setTab] = useState<(typeof tabs)[number]>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filtered = useMemo(
    () => (tab === "all" ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab]
  )

  function openView(order: AdminOrder) {
    setSelectedOrder(order)
    setDialogOpen(true)
  }

  async function updateStatus(
    id: string, 
    status: OrderStatus
  ) {
    try {
      const updatedOrder = await updateOrderStatusApi(id, status)
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? updatedOrder : o))
      )
      toast.success("Order status updated.");
    } catch (error) {
      toast.error("Failed to update order.")
      console.error("Error updating order status:", error)
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await getAllOrdersApi();
        setOrders(orders)
      } catch (error) {
        toast.error("Failed to load orders.")
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [])

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
                            <TableHead>PayMethod</TableHead>
                            <TableHead>PayStatus</TableHead>
                            <TableHead>ShipStatus</TableHead>
                            <TableHead className="pr-6 text-right">Update</TableHead>
                            <TableHead className="pr-6 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((order) => (
                        <TableRow key={order._id} className="h-14">
                            <TableCell className="pl-6 font-medium">
                                {order.orderId}
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
                                    <span className="text-xs text-muted-foreground">
                                        {order.billingDetails.phone}
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
                            <TableCell className="pr-6">
                                <div className="flex justify-end">
                                    <Select
                                        value={order.status}
                                        onValueChange={async (v) =>
                                            await updateStatus(order._id, v as OrderStatus)
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
                            <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="View"
                                        className="text-muted-foreground hover:text-destructive mr-2"
                                        onClick={() => openView(order)}
                                    >
                                        <ExternalLink data-icon="inline-start" />
                                    </Button>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="md:max-w-lg p-4">
          {selectedOrder && (
            <>
                <DialogHeader className="flex flex-row justify-between border-b-2 pt-1 gap-2 mr-2">
                    <DialogTitle className="text-2xl font-semibold mb-2">Order Details</DialogTitle>
                    <div className="flex flex-col leading-tight mb-2">
                        <Field>
                            <FieldLabel className="text-lg">{selectedOrder?.orderId}</FieldLabel>
                        </Field>
                        <Field>
                            <FieldLabel>{new Date(selectedOrder?.createdAt).toLocaleDateString()}</FieldLabel>
                        </Field>
                    </div>
                </DialogHeader>

                <FieldGroup>
                    <Field>
                        <FieldLabel className="text-md font-semibold">Customer</FieldLabel>
                        <div className="grid grid-cols-2">
                            <p>{selectedOrder.billingDetails.fullName}</p>
                            <div className="grid grid-cols-2 gap-6">
                                <p>{selectedOrder.billingDetails.email}</p>
                                <p className="text-right">{selectedOrder.billingDetails.phone}</p>
                            </div>
                        </div>
                    </Field>
                    <Field>
                        <FieldLabel className="text-md font-semibold">Items</FieldLabel>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedOrder.items.map((item) => (
                                    <TableRow key={item.productId}>
                                        <TableCell>{item.productId}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell className="text-right">{currency(item.price * item.qty)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Field>
                    <div className="grid grid-cols-3 gap-4">
                        <Field>
                            <FieldLabel className="text-md font-semibold">Total</FieldLabel>
                            <p>{currency(selectedOrder.total)}</p>
                        </Field>
                        <Field>
                            <FieldLabel className="text-md font-semibold">Pay-Method</FieldLabel>
                            <p>{selectedOrder.paymentMethod}</p>
                        </Field>
                        <Field>
                            <FieldLabel className="text-md font-semibold">Pay-Status</FieldLabel>
                            <p>{selectedOrder.paymentStatus}</p>
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel className="text-md font-semibold">Shipping Address</FieldLabel>
                        <p>{selectedOrder.shippingDetails.address}</p>
                        <div className="grid grid-cols-2 gap-4">
                            <p>{selectedOrder.shippingDetails.district}</p>
                            <p>Post Code: {selectedOrder.shippingDetails.postalCode}</p>
                        </div>
                    </Field>
                </FieldGroup>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
