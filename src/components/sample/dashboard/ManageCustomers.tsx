"use client"

import { useEffect, useMemo, useState } from "react"
import { Mail, Phone, Search, Users } from "lucide-react"

import { PageHeader } from "./DashBoardShell"
import { StatCard } from "./StatCard"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback } from "../ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { cn } from "../../../lib/utils"
// import { customers } from "../../../lib/data"
import { currency } from "../../../types/Order"
import type { Customer } from "../../../types/Customer"
import { getAllCustomers } from "../../../api/customerApi"

const tierStyles: Record<Customer["tier"], string> = {
  VIP: "bg-primary/15 text-primary ring-primary/25",
  Loyal: "bg-sky-500/10 text-sky-600 ring-sky-500/20",
  New: "bg-muted text-muted-foreground ring-border",
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
}

export function CustomersManager() {
  const [query, setQuery] = useState("")
  const [customers, setCustomers] = useState<Customer[]>([]);

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase())
      ),
    [customers, query]
  )

  useEffect(() => {
    const loadCustomers = async () => {
        const data = await getAllCustomers();
        console.log("Fetched customers:", data);
        setCustomers(data);
    };

    loadCustomers();
  }, [])

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalPurchases, 0)
  const vipCount = customers.filter((c) => c.tier === "VIP").length

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
            title="Customers"
            description="Your clientele and their lifetime value."
        />

        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
            <StatCard
                label="Total Customers"
                value={String(customers.length)}
                delta="4 new"
                trend="up"
                hint="this week"
                icon={Users}
            />
            <StatCard
                label="VIP Clients"
                value={String(vipCount)}
                delta="18%"
                trend="up"
                hint="of base"
            icon={Users}
            />
            <StatCard
                label="Lifetime Value"
                value={currency(totalRevenue)}
                delta="9.2%"
                trend="up"
                hint="vs last quarter"
                icon={Users}
            />
        </div>

        <Card className="shadow-sm">
            <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
                <div className="relative w-full sm:max-w-md">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or email…"
                        className="pl-9"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border border-border/60">
                    <Table>
                    <TableHeader>
                        <TableRow className="h-12">
                        <TableHead className="pl-6">Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead className="text-center">Orders</TableHead>
                        <TableHead className="pr-6 text-right">Total Purchases</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((customer) => (
                        <TableRow key={customer._id} className="h-16">
                            <TableCell className="pl-6">
                                <div className="flex items-center gap-3 py-2">
                                    <Avatar className="size-10">
                                        <AvatarFallback className="bg-accent text-accent-foreground">
                                            {initials(customer.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col leading-tight">
                                        <span className="font-medium">{customer.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {customer.customerId}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="size-3.5" />
                                    {customer.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="size-3.5" />
                                    {customer.contact}
                                </span>
                            </div>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={cn(
                                    "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                                    tierStyles[customer.tier]
                                    )}
                                >
                                    {customer.tier}
                                </span>
                            </TableCell>
                            <TableCell className="text-center tabular-nums">
                                {customer.orders}
                            </TableCell>
                            <TableCell className="pr-6 text-right font-medium tabular-nums">
                                {currency(customer.totalPurchases)}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
                {filtered.length === 0 ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">
                        No customers found.
                    </p>
                ) : null}
            </CardContent>
        </Card>
      </div>
    </>
  )
}
