export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  image: string
  status: "Active" | "Draft"
}

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled"

export type Order = {
  id: string
  customer: string
  email: string
  date: string
  items: number
  total: number
  status: OrderStatus
}

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalPurchases: number
  tier: "VIP" | "Loyal" | "New"
}

export type Coupon = {
  id: string
  code: string
  description: string
  discount: string
  used: number
  limit: number
  status: "Active" | "Scheduled" | "Expired"
}

export const products: Product[] = [
  {
    id: "MN-1042",
    name: "Noir Silk Evening Gown",
    category: "Dresses",
    price: 1290,
    stock: 24,
    image: "/products/silk-gown.png",
    status: "Active",
  },
  {
    id: "MN-1043",
    name: "Tailored Wool Blazer",
    category: "Outerwear",
    price: 845,
    stock: 8,
    image: "/products/wool-blazer.png",
    status: "Active",
  },
  {
    id: "MN-1044",
    name: "Structured Leather Handbag",
    category: "Accessories",
    price: 1650,
    stock: 41,
    image: "/products/leather-handbag.png",
    status: "Active",
  },
  {
    id: "MN-1045",
    name: "Gilded Cashmere Scarf",
    category: "Accessories",
    price: 320,
    stock: 3,
    image: "/products/cashmere-scarf.png",
    status: "Active",
  },
  {
    id: "MN-1046",
    name: "Patent Stiletto Heels",
    category: "Footwear",
    price: 590,
    stock: 16,
    image: "/products/stiletto-heels.png",
    status: "Active",
  },
  {
    id: "MN-1047",
    name: "Classic Belted Trench",
    category: "Outerwear",
    price: 980,
    stock: 2,
    image: "/products/trench-coat.png",
    status: "Draft",
  },
]

export const orders: Order[] = [
  { id: "#ORD-7781", customer: "Isabella Laurent", email: "isabella@example.com", date: "2026-06-24", items: 2, total: 2140, status: "Delivered" },
  { id: "#ORD-7780", customer: "Marcus Chen", email: "marcus@example.com", date: "2026-06-24", items: 1, total: 845, status: "Shipped" },
  { id: "#ORD-7779", customer: "Amara Okafor", email: "amara@example.com", date: "2026-06-23", items: 3, total: 2560, status: "Pending" },
  { id: "#ORD-7778", customer: "Sofia Rossi", email: "sofia@example.com", date: "2026-06-23", items: 1, total: 1650, status: "Delivered" },
  { id: "#ORD-7777", customer: "James Whitmore", email: "james@example.com", date: "2026-06-22", items: 2, total: 910, status: "Shipped" },
  { id: "#ORD-7776", customer: "Yuki Tanaka", email: "yuki@example.com", date: "2026-06-22", items: 4, total: 3180, status: "Pending" },
  { id: "#ORD-7775", customer: "Olivia Bennett", email: "olivia@example.com", date: "2026-06-21", items: 1, total: 320, status: "Cancelled" },
  { id: "#ORD-7774", customer: "Liam Foster", email: "liam@example.com", date: "2026-06-21", items: 2, total: 1570, status: "Delivered" },
]

export const customers: Customer[] = [
  { id: "C-201", name: "Isabella Laurent", email: "isabella@example.com", phone: "+1 (212) 555-0142", orders: 18, totalPurchases: 24850, tier: "VIP" },
  { id: "C-202", name: "Marcus Chen", email: "marcus@example.com", phone: "+1 (415) 555-0198", orders: 9, totalPurchases: 9420, tier: "Loyal" },
  { id: "C-203", name: "Amara Okafor", email: "amara@example.com", phone: "+44 20 7946 0321", orders: 12, totalPurchases: 15600, tier: "VIP" },
  { id: "C-204", name: "Sofia Rossi", email: "sofia@example.com", phone: "+39 06 5555 0188", orders: 6, totalPurchases: 7240, tier: "Loyal" },
  { id: "C-205", name: "James Whitmore", email: "james@example.com", phone: "+1 (312) 555-0110", orders: 3, totalPurchases: 2110, tier: "New" },
  { id: "C-206", name: "Yuki Tanaka", email: "yuki@example.com", phone: "+81 3 5555 0177", orders: 21, totalPurchases: 31200, tier: "VIP" },
  { id: "C-207", name: "Olivia Bennett", email: "olivia@example.com", phone: "+1 (646) 555-0123", orders: 2, totalPurchases: 640, tier: "New" },
]

export const coupons: Coupon[] = [
  { id: "P-01", code: "SUMMER25", description: "25% off summer collection", discount: "25%", used: 412, limit: 1000, status: "Active" },
  { id: "P-02", code: "VIPGOLD", description: "Free shipping for VIP tier", discount: "Free shipping", used: 86, limit: 200, status: "Active" },
  { id: "P-03", code: "FW26LAUNCH", description: "$150 off Fall/Winter preview", discount: "$150", used: 0, limit: 500, status: "Scheduled" },
  { id: "P-04", code: "WELCOME10", description: "10% off first order", discount: "10%", used: 1893, limit: 5000, status: "Active" },
  { id: "P-05", code: "SPRING20", description: "20% off spring archive", discount: "20%", used: 740, limit: 740, status: "Expired" },
]

export const monthlyRevenue = [
  { month: "Jan", revenue: 142000, target: 130000 },
  { month: "Feb", revenue: 138500, target: 135000 },
  { month: "Mar", revenue: 165200, target: 150000 },
  { month: "Apr", revenue: 158900, target: 155000 },
  { month: "May", revenue: 189400, target: 170000 },
  { month: "Jun", revenue: 214700, target: 190000 },
  { month: "Jul", revenue: 198300, target: 195000 },
  { month: "Aug", revenue: 221600, target: 200000 },
  { month: "Sep", revenue: 248100, target: 220000 },
  { month: "Oct", revenue: 263400, target: 240000 },
  { month: "Nov", revenue: 312800, target: 280000 },
  { month: "Dec", revenue: 358900, target: 320000 },
]

export const categorySales = [
  { category: "Dresses", sales: 86400 },
  { category: "Outerwear", sales: 72100 },
  { category: "Accessories", sales: 94800 },
  { category: "Footwear", sales: 51300 },
  { category: "Knitwear", sales: 38700 },
]

export const topSelling = [
  { name: "Structured Leather Handbag", category: "Accessories", units: 312, revenue: 514800, image: "/products/leather-handbag.png" },
  { name: "Noir Silk Evening Gown", category: "Dresses", units: 184, revenue: 237360, image: "/products/silk-gown.png" },
  { name: "Patent Stiletto Heels", category: "Footwear", units: 268, revenue: 158120, image: "/products/stiletto-heels.png" },
  { name: "Tailored Wool Blazer", category: "Outerwear", units: 142, revenue: 119990, image: "/products/wool-blazer.png" },
  { name: "Gilded Cashmere Scarf", category: "Accessories", units: 421, revenue: 134720, image: "/products/cashmere-scarf.png" },
]

export const trafficSource = [
  { source: "Direct", value: 38 },
  { source: "Social", value: 27 },
  { source: "Search", value: 21 },
  { source: "Referral", value: 14 },
]

export const currency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(value)
