"use client"

import { useMemo, useState } from "react"
import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "../dashboard/DashBoardShell"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { currency } from "../../../types/Order"
import type { AdminProduct } from "../../../types/Product"

const categories = ["Dresses", "Outerwear", "Accessories", "Footwear", "Knitwear"]

const emptyForm = {
  name: "",
  category: "Dresses",
  price: "",
  description: "",
  image: null as File | string | null,
  sizes: {
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  }
}

export function ProductsManager() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<AdminProduct | null>(null)
  const [form, setForm] = useState(emptyForm)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter
      return matchesQuery && matchesCategory
    })
  }, [products, query, categoryFilter])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(product: AdminProduct) {
    setEditing(product)
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
      sizes: product.sizes,
    })
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Please enter a product name.")
      return
    }
    const price = Number(form.price)

    if (editing) {
      setProducts((prev) =>
        prev.map((p) =>
          p._id === editing._id
            ? {
              ...p,
              name: form.name,
              category: form.category,
              description: form.description,
              price,
              image: form.image,
              sizes: form.sizes,
            }
            : p
        )
      )
      toast.success(`${form.name} updated.`)
    } else {
      const newProduct = {
        _id: crypto.randomUUID(),
        name: form.name,
        category: form.category,
        description: form.description,
        price,
        image: form.image,
        sizes: form.sizes,
      }
      setProducts((prev) => [newProduct, ...prev])
      toast.success("Product added.")
    }
    setDialogOpen(false)
  }

  function handleStockChange(size: string, value: number) {
    setForm((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: value,
      },
    }))
  }

  function handleDelete(product: AdminProduct) {
    setProducts((prev) => prev.filter((p) => p._id !== product._id))
    toast.success(`${product.name} removed.`)
  }

  // const totalStock = products.reduce((sum, p) => sum + Object.values(p.sizes).reduce((a, b) => a + b, 0), 0)

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 w-full">
        <PageHeader
            title="Products"
            description="Manage your catalog, pricing, and inventory."
        >
            <Button size="sm" onClick={openCreate}>
            <Plus data-icon="inline-start" />
                Add Product
            </Button>
        </PageHeader>

        <Card>
            <CardContent className="flex flex-col gap-6 p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products…"
                            className="pl-9"
                        />
                    </div>
                    <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value ?? "all")}>
                        <SelectTrigger className="h-9 w-full sm:w-52">
                            <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All categories</SelectItem>
                                {categories.map((c) => (
                                    <SelectItem key={c} value={c}>
                                    {c}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="overflow-x-auto rounded-lg border border-border/60">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <div className="flex items-center gap-3 py-1">
                                        <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                                            {product.image && (
                                              <img
                                                src={`http://localhost:5000/uploads/${product.image}`}
                                                width="50"
                                                alt={product.name}
                                              />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{product.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {product._id}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {product.category}
                                </TableCell>
                                <TableCell className="text-right font-medium tabular-nums">
                                    {currency(product.price)}
                                </TableCell>
                                <TableCell className="text-right tabular-nums">
                                    {(() => {
                                      const totalStock = Object.values(product.sizes).reduce(
                                        (sum, qty) => sum + qty,
                                        0
                                      )
                                      return totalStock <= 5 ? (
                                        <Badge variant="destructive">{totalStock}</Badge>
                                      ) : (
                                        totalStock
                                      )
                                    })()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Edit"
                                            onClick={() => openEdit(product)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Delete"
                                            className="text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {filtered.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                    No products match your filters.
                    </p>
                ) : null}
            </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader className="space-y-2">
            <DialogTitle>
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the details for this catalog item."
                : "Add a new item to your Maison Noir catalog."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4">
            <Field>
              <FieldLabel htmlFor="name">Product name</FieldLabel>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Noir Silk Evening Gown"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. A stunning evening gown for special occasions"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Select
                  value={form.category}
                  onValueChange={(v) => 
                    setForm({ 
                        ...form, 
                        category: v ?? "Dresses",
                    })
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="price">Price (LKR)</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <div key={size} className="space-y-2">
                      <label className="text-sm font-medium">{size}</label>
                      <Input
                        type="number"
                        min={0}
                        value={form.sizes[size as keyof typeof form.sizes]}
                        onChange={(e) => 
                          handleStockChange(size, Number(e.target.value))
                        }
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  value={typeof form.image === "string" ? form.image : ""}
                  onChange={(e) => 
                    setForm({ 
                      ...form, 
                      image: e.target.files?.[0] ?? null 
                    })
                  }
                />
                {form.image instanceof File ? (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="preview"
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                ) : typeof form.image === "string" ? (
                  <img
                    src={`http://localhost:5000/uploads/${form.image}`}
                    alt="preview"
                    className="w-[50px] h-[50px] object-cover rounded"
                  />
                ) : null}
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter showCloseButton>
            <Button onClick={handleSave}>
              {editing ? "Save changes" : "Add product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
