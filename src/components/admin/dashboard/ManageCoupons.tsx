import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { PageHeader } from "./DashBoardShell";
import { useEffect, useMemo, useState } from "react";
import type { Coupon, CouponEvents } from "../../../types/Coupon";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { createCoupon, deleteCoupon, getCoupons, updateCoupon } from "../../../api/couponApi";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const emptyForm = {
  code: "",
  title: "",
  description: "",
  discount: 0,
  event: "",
  isBirthdayMonthOffer: false,    
  isActive: true,
  type: "percentage",
  startDate: "",
  expiryDate: "",
  minOrderAmount: 0,
}

const eventValues: CouponEvents[] = [
  "new-year",
  "christmas",
  "valentine",
  "year-end",
  "birthday",
  "birth-month",
  "order-value",
];

const eventLabels: Record<CouponEvents, string> = {
  "new-year": "New Year",
  christmas: "Christmas",
  valentine: "Valentine",
  "year-end": "Year End",
  birthday: "Birthday",
  "birth-month": "Birth Month",
  "order-value": "Order Value",
};

const tabs = ["all", ...eventValues] as const;

export function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [tab, setTab] = useState<(typeof tabs)[number]>("all");
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(
    () => (tab === "all" ? coupons : coupons.filter((c) => c.event === tab)),
    [coupons, tab]
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: coupons.length }
    eventValues.forEach((e) => {
      map[e] = coupons.filter((c) => c.event === e).length
    })
    return map
  }, [coupons])

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
      toast.error("Failed to load coupons");
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (err) {
        console.error("Error fetching coupons:", err);
        toast.error("Failed to load coupons");
      }
    };

    fetchCoupons();
  }, []);

  async function handleSave() {
    if (!form.code.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Please enter a coupon title.");
      return;
    }

    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
      };

      if (editing) {
        const res = await updateCoupon(editing._id, payload);
        await loadCoupons();
        setCoupons((prev) =>
          prev.map((c) => (c._id === editing._id ? res.coupon : c))
        );
        toast.success("Coupon updated successfully.");
      } else {
        const res = await createCoupon(payload);
        await loadCoupons();
        setCoupons((prev) => [res.coupon, ...prev]);
        toast.success("Coupon created successfully.");
      }

      setDialogOpen(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (err: any) {
      console.error("Error saving coupon:", err);
      toast.error(err?.response?.data?.message || "Failed to save coupon.");
    }
  }

  function handleEdit(coupon: Coupon) {
    setEditing(coupon);
    setForm({
       code: coupon.code,
       title: coupon.title,
       description: coupon.description,
       discount: coupon.discount,
       type: coupon.type,
       event: coupon.event || "",
       isBirthdayMonthOffer: coupon.isBirthdayMonthOffer || false,
       isActive: coupon.isActive || true,
       startDate: coupon.startDate.split("T")[0],
       expiryDate: coupon.expiryDate.split("T")[0],
       minOrderAmount: coupon.minOrderAmount,
    });
    setDialogOpen(true);
  }

  async function handleDelete(_id: string) {
    try {
      await deleteCoupon(_id);
      await loadCoupons();
      setCoupons((prev) => prev.filter((c) => c._id !== _id));
      toast.success("Coupon deleted successfully.");
    } catch (err: any) {
      console.error("Error deleting coupon:", err);
      toast.error("Failed to delete coupon.");
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 w-full">
        <PageHeader
          title="Coupons"
          description="Manage your coupons and promotional codes here."
        >
            <Button size="sm" onClick={openCreate}>
                <Plus data-icon="inline-start" />
                Add Coupon
            </Button>
        </PageHeader>

        <div className="flex">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as (typeof tabs)[number])}
          >
            <TabsList className="gap-1 p-1">
              {tabs.map((t) => (
                <TabsTrigger 
                  key={t} 
                  value={t} 
                  className="capitalize px-3 py-1.5"
                >
                  {t === "all" ? "All" : eventLabels[t]}
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {counts[t] ?? 0}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <Card>
          <CardContent className="flex flex-col gap-6 p-4 sm:p-6">
            <div className="overflow-x-auto rounded-lg border border-border/60">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Min</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>BMO</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((coupon) => (
                    <TableRow key={coupon._id}>
                      <TableCell>{coupon.code}</TableCell>
                      <TableCell>{coupon.title}</TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                      <TableCell>{coupon.type}</TableCell>
                      <TableCell>
                        {coupon.event
                          ? eventLabels[coupon.event as CouponEvents]
                          : "-"}
                      </TableCell>
                      <TableCell>{coupon.minOrderAmount}</TableCell>
                      <TableCell>{new Date(coupon.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{coupon.birthdayMonthOffer ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(coupon)}>
                          <Pencil data-icon="inline-start" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(coupon._id)}>
                          <Trash data-icon="inline-start" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Coupon" : "Add Coupon"}
            </DialogTitle>
            <DialogDescription>
              {editing 
                ? "Edit the details of the coupon below."
                : "Fill in the details to create a new coupon."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-2">
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="code">Coupon Code</FieldLabel>
                <Input
                  id="code"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="discount">Discount (%)</FieldLabel>
                <Input
                  id="discount"
                  type="number"
                  value={form.discount}
                  onChange={(e) => 
                    setForm({ 
                        ...form, 
                        discount: Number(e.target.value) 
                    })
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="type">Type</FieldLabel>
                <Input
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="minOrder">Min Amount</FieldLabel>
                <Input
                  id="minOrder"
                  type="number"
                  value={form.minOrderAmount}
                  onChange={(e) => 
                    setForm({ 
                        ...form, 
                        minOrderAmount: Number(e.target.value) 
                    })
                  }
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="event">Event</FieldLabel>
                <Select
                  value={form.event}
                  onValueChange={(value) => 
                    setForm({ 
                      ...form, 
                      event: value as CouponEvents, 
                    })
                  }
                >
                  <SelectTrigger id="event" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {eventValues.map((e) => (
                        <SelectItem key={e} value={e}>
                          {eventLabels[e]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field className="flex flex-row items-center gap-0.5">
                <Input
                  id="isBirthdayMonthOffer"
                  type="checkbox"
                  checked={form.isBirthdayMonthOffer}
                  onChange={(e) => setForm({ ...form, isBirthdayMonthOffer: e.target.checked })}
                  className="w-[16px] h-[16px]"
                />
                <FieldLabel htmlFor="isBirthdayMonthOffer">BirthDay Month Offer</FieldLabel>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                <Input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="expiryDate">Expiry Date</FieldLabel>
                <Input
                  id="expiryDate"
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                />
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter showCloseButton>
            <Button onClick={handleSave}>
              {editing ? "Update Coupon" : "Add Coupon"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}