"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, Clock, MapPin, Package, Star, Search, ShoppingCart, Plus, Minus } from "lucide-react"

interface Medicine {
  id: string
  name: string
  nameInTamil: string
  category: string
  price: number
  inStock: boolean
  description: string
  image: string
  manufacturer: string
  prescription: boolean
}

interface CartItem extends Medicine {
  quantity: number
}

const medicines: Medicine[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    nameInTamil: "பாராசிட்டமால் 500மி.கி",
    category: "Pain Relief",
    price: 25,
    inStock: true,
    description: "Fever and pain relief medication",
    image: "/paracetamol-tablets.png",
    manufacturer: "Apollo Pharmacy",
    prescription: false,
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    nameInTamil: "அமோக்ஸிசிலின் 250மி.கி",
    category: "Antibiotic",
    price: 120,
    inStock: true,
    description: "Antibiotic for bacterial infections",
    image: "/amoxicillin-capsules.png",
    manufacturer: "Sun Pharma",
    prescription: true,
  },
  {
    id: "3",
    name: "Vitamin D3 1000 IU",
    nameInTamil: "வைட்டமின் டி3 1000 ஐ.யூ",
    category: "Vitamins",
    price: 180,
    inStock: true,
    description: "Bone health and immunity support",
    image: "/placeholder-iytzk.png",
    manufacturer: "HealthKart",
    prescription: false,
  },
  {
    id: "4",
    name: "Insulin Glargine",
    nameInTamil: "இன்சுலின் கிளார்ஜின்",
    category: "Diabetes",
    price: 850,
    inStock: true,
    description: "Long-acting insulin for diabetes",
    image: "/insulin-pen.jpg",
    manufacturer: "Novo Nordisk",
    prescription: true,
  },
  {
    id: "5",
    name: "Omeprazole 20mg",
    nameInTamil: "ஓமெப்ராசோல் 20மி.கி",
    category: "Gastric",
    price: 95,
    inStock: false,
    description: "Acid reflux and stomach ulcer treatment",
    image: "/omeprazole-capsules.jpg",
    manufacturer: "Dr. Reddy's",
    prescription: true,
  },
]

const deliveryPartners = [
  {
    id: "1",
    name: "MedExpress",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 25,
    minOrder: 200,
  },
  {
    id: "2",
    name: "PharmFast",
    rating: 4.6,
    deliveryTime: "45-60 min",
    deliveryFee: 15,
    minOrder: 150,
  },
  {
    id: "3",
    name: "HealthRush",
    rating: 4.9,
    deliveryTime: "20-30 min",
    deliveryFee: 35,
    minOrder: 300,
  },
]

export function HomeDelivery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<CartItem[]>([])
  const [filteredMedicines, setFilteredMedicines] = useState(medicines)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [selectedPartner, setSelectedPartner] = useState(deliveryPartners[0])
  const [showCart, setShowCart] = useState(false)

  const categories = ["all", "Pain Relief", "Antibiotic", "Vitamins", "Diabetes", "Gastric"]

  useEffect(() => {
    let filtered = medicines

    if (searchQuery) {
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.nameInTamil.includes(searchQuery) ||
          med.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((med) => med.category === selectedCategory)
    }

    setFilteredMedicines(filtered)
  }, [searchQuery, selectedCategory])

  const addToCart = (medicine: Medicine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === medicine.id)
      if (existing) {
        return prev.map((item) => (item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...medicine, quantity: 1 }]
    })
  }

  const removeFromCart = (medicineId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === medicineId)
      if (existing && existing.quantity > 1) {
        return prev.map((item) => (item.id === medicineId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prev.filter((item) => item.id !== medicineId)
    })
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleOrderNow = () => {
    if (cart.length === 0) {
      alert("Please add items to cart first")
      return
    }
    if (!deliveryAddress.trim()) {
      alert("Please enter delivery address")
      return
    }

    const orderSummary = `Order placed successfully!\n\nItems: ${getTotalItems()}\nTotal: ₹${getTotalAmount() + selectedPartner.deliveryFee}\nDelivery: ${selectedPartner.deliveryTime}\nPartner: ${selectedPartner.name}\n\nYour medicines will be delivered to:\n${deliveryAddress}`

    alert(orderSummary)
    setCart([])
    setDeliveryAddress("")
    setShowCart(false)
  }

  if (showCart) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Medicine Cart ({getTotalItems()} items)
          </CardTitle>
          <CardDescription>Review your order and select delivery options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={() => setShowCart(false)} className="mt-4">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.nameInTamil}</p>
                      <p className="text-sm font-medium text-primary">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Delivery Address (Tamil/English)</label>
                  <Textarea
                    placeholder="முகவரியை உள்ளிடவும் / Enter your delivery address..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Select Delivery Partner</label>
                  <div className="grid gap-3 mt-2">
                    {deliveryPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPartner.id === partner.id
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedPartner(partner)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{partner.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{partner.rating}</span>
                              <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                              <span className="text-sm">{partner.deliveryTime}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">₹{partner.deliveryFee}</p>
                            <p className="text-xs text-muted-foreground">delivery fee</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>₹{selectedPartner.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-primary">₹{getTotalAmount() + selectedPartner.deliveryFee}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleOrderNow}
                    disabled={!deliveryAddress.trim() || getTotalAmount() < selectedPartner.minOrder}
                    className="flex-1"
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Order Now
                  </Button>
                  <Button variant="outline" onClick={() => setShowCart(false)}>
                    Continue Shopping
                  </Button>
                </div>

                {getTotalAmount() < selectedPartner.minOrder && (
                  <p className="text-sm text-muted-foreground text-center">
                    Minimum order: ₹{selectedPartner.minOrder} for {selectedPartner.name}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Truck className="h-6 w-6 text-primary" />
          Home Delivery Service
        </CardTitle>
        <CardDescription>
          Order medicines with fast delivery in Tamil Nadu • மருந்துகளை வீட்டிற்கே வரவழைக்கவும்
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines... / மருந்துகளைத் தேடுங்கள்..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowCart(true)} variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="border border-muted hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={medicine.image || "/placeholder.svg"}
                    alt={medicine.name}
                    className="h-20 w-20 object-cover rounded border"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{medicine.name}</h3>
                        <p className="text-sm text-muted-foreground">{medicine.nameInTamil}</p>
                        <p className="text-xs text-muted-foreground mt-1">{medicine.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {medicine.category}
                          </Badge>
                          {medicine.prescription && (
                            <Badge variant="destructive" className="text-xs">
                              Prescription Required
                            </Badge>
                          )}
                          <Badge variant={medicine.inStock ? "default" : "secondary"} className="text-xs">
                            {medicine.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">₹{medicine.price}</div>
                        <div className="text-xs text-muted-foreground">{medicine.manufacturer}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => addToCart(medicine)} disabled={!medicine.inStock} className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  {cart.find((item) => item.id === medicine.id) && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded">
                      <span className="text-sm">In cart: {cart.find((item) => item.id === medicine.id)?.quantity}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No medicines found matching your search.</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3 mt-8">
          <div className="p-4 border rounded-lg text-center">
            <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Fast Delivery</h4>
            <p className="text-xs text-muted-foreground">20-60 minutes</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <Package className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h4 className="font-semibold">Secure Packaging</h4>
            <p className="text-xs text-muted-foreground">Temperature controlled</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Live Tracking</h4>
            <p className="text-xs text-muted-foreground">Real-time updates</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
