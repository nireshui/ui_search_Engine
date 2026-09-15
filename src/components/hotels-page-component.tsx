"use client";

import { useState } from "react";
import {
  Bed,
  BedDouble,
  Building2,
  Edit,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardHead, Field, PageIntro, StatusBadge, TableWrap, Td, Th, inputClass } from "@/components/admin-ui";

type HotelStatus = "Active" | "Maintenance" | "Upcoming";
type RoomStatus = "Active" | "Low Inventory" | "Maintenance";

interface HotelProperty {
  id: string;
  name: string;
  location: string;
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  adr: string;
  status: HotelStatus;
  contactEmail: string;
  phone: string;
  rating: number;
}

interface RoomType {
  id: string;
  name: string;
  hotelName: string;
  totalInventory: number;
  availableInventory: number;
  basePrice: string;
  maxGuests: number;
  status: RoomStatus;
  amenities: string[];
}

const INITIAL_HOTELS: HotelProperty[] = [
  {
    id: "HTL-01",
    name: "Grand Palace Hotel",
    location: "Chennai, Tamil Nadu",
    totalRooms: 186,
    availableRooms: 41,
    occupiedRooms: 132,
    adr: "₹6,450",
    status: "Active",
    contactEmail: "reservations@grandpalace.com",
    phone: "+91 44 2833 1122",
    rating: 4.8,
  },
  {
    id: "HTL-02",
    name: "Marina Bay Suites",
    location: "Mumbai, Maharashtra",
    totalRooms: 154,
    availableRooms: 36,
    occupiedRooms: 106,
    adr: "₹9,200",
    status: "Active",
    contactEmail: "info@marinabaysuites.com",
    phone: "+91 22 6655 4433",
    rating: 4.9,
  },
  {
    id: "HTL-03",
    name: "Azure Residency",
    location: "Calangute, Goa",
    totalRooms: 128,
    availableRooms: 28,
    occupiedRooms: 91,
    adr: "₹7,800",
    status: "Active",
    contactEmail: "stay@azureresidency.com",
    phone: "+91 832 2277 889",
    rating: 4.7,
  },
  {
    id: "HTL-04",
    name: "Veranda Grand",
    location: "Bengaluru, Karnataka",
    totalRooms: 205,
    availableRooms: 52,
    occupiedRooms: 139,
    adr: "₹5,900",
    status: "Active",
    contactEmail: "bengaluru@verandagrand.com",
    phone: "+91 80 4123 9900",
    rating: 4.6,
  },
  {
    id: "HTL-05",
    name: "The Fern Court",
    location: "Kochi, Kerala",
    totalRooms: 177,
    availableRooms: 57,
    occupiedRooms: 58,
    adr: "₹4,850",
    status: "Maintenance",
    contactEmail: "support@ferncourtkochi.com",
    phone: "+91 484 2390 112",
    rating: 4.4,
  },
];

const INITIAL_ROOM_TYPES: RoomType[] = [
  {
    id: "RM-101",
    name: "Deluxe Ocean Room",
    hotelName: "Grand Palace Hotel",
    totalInventory: 64,
    availableInventory: 12,
    basePrice: "₹5,310",
    maxGuests: 2,
    status: "Active",
    amenities: ["Free Wi-Fi", "King Bed", "Ocean View", "Breakfast Included"],
  },
  {
    id: "RM-102",
    name: "Executive Business Suite",
    hotelName: "Grand Palace Hotel",
    totalInventory: 42,
    availableInventory: 6,
    basePrice: "₹7,850",
    maxGuests: 2,
    status: "Low Inventory",
    amenities: ["Free Wi-Fi", "Lounge Access", "Work Desk", "Espresso Machine"],
  },
  {
    id: "RM-103",
    name: "Royal Heritage Suite",
    hotelName: "Marina Bay Suites",
    totalInventory: 18,
    availableInventory: 3,
    basePrice: "₹12,500",
    maxGuests: 4,
    status: "Low Inventory",
    amenities: ["Jacuzzi", "Private Balcony", "Butler Service", "Airport Shuttle"],
  },
  {
    id: "RM-104",
    name: "Standard Superior Queen",
    hotelName: "Azure Residency",
    totalInventory: 50,
    availableInventory: 18,
    basePrice: "₹4,200",
    maxGuests: 2,
    status: "Active",
    amenities: ["Free Wi-Fi", "Pool View", "Mini Fridge"],
  },
  {
    id: "RM-105",
    name: "Penthouse Villa",
    hotelName: "Veranda Grand",
    totalInventory: 10,
    availableInventory: 0,
    basePrice: "₹18,900",
    maxGuests: 6,
    status: "Maintenance",
    amenities: ["Private Pool", "3 Bedrooms", "Chef Service", "Panoroma View"],
  },
];

export function HotelsPageComponent() {
  const [hotelsList, setHotelsList] = useState<HotelProperty[]>(INITIAL_HOTELS);
  const [roomTypesList, setRoomTypesList] = useState<RoomType[]>(INITIAL_ROOM_TYPES);
  const [searchHotelQuery, setSearchHotelQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"hotels" | "rooms">("hotels");

  // Modals state
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<HotelProperty | null>(null);

  // New Hotel Form State
  const [newHotelName, setNewHotelName] = useState("");
  const [newHotelLocation, setNewHotelLocation] = useState("");
  const [newTotalRooms, setNewTotalRooms] = useState("100");
  const [newAdr, setNewAdr] = useState("5500");

  // New Room Type Form State
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomHotel, setNewRoomHotel] = useState("Grand Palace Hotel");
  const [newRoomInventory, setNewRoomInventory] = useState("30");
  const [newRoomPrice, setNewRoomPrice] = useState("6500");

  const filteredHotels = hotelsList.filter(
    (h) =>
      h.name.toLowerCase().includes(searchHotelQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchHotelQuery.toLowerCase())
  );

  const getHotelStatusTone = (status: HotelStatus) => {
    switch (status) {
      case "Active":
        return "success";
      case "Maintenance":
        return "warning";
      case "Upcoming":
        return "info";
      default:
        return "neutral";
    }
  };

  const getRoomStatusTone = (status: RoomStatus) => {
    switch (status) {
      case "Active":
        return "success";
      case "Low Inventory":
        return "warning";
      case "Maintenance":
        return "danger";
      default:
        return "neutral";
    }
  };

  const handleAddHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName) return;

    const newProperty: HotelProperty = {
      id: `HTL-0${hotelsList.length + 1}`,
      name: newHotelName,
      location: newHotelLocation || "Mumbai, India",
      totalRooms: Number(newTotalRooms),
      availableRooms: Math.floor(Number(newTotalRooms) * 0.3),
      occupiedRooms: Math.floor(Number(newTotalRooms) * 0.7),
      adr: `₹${Number(newAdr).toLocaleString("en-IN")}`,
      status: "Active",
      contactEmail: `${newHotelName.toLowerCase().replace(/\s+/g, "")}@example.com`,
      phone: "+91 98000 55443",
      rating: 4.5,
    };

    setHotelsList([...hotelsList, newProperty]);
    setIsAddHotelOpen(false);
    setNewHotelName("");
    setNewHotelLocation("");
  };

  const handleAddRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;

    const newRoom: RoomType = {
      id: `RM-${Math.floor(106 + Math.random() * 90)}`,
      name: newRoomName,
      hotelName: newRoomHotel,
      totalInventory: Number(newRoomInventory),
      availableInventory: Math.floor(Number(newRoomInventory) * 0.4),
      basePrice: `₹${Number(newRoomPrice).toLocaleString("en-IN")}`,
      maxGuests: 2,
      status: "Active",
      amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
    };

    setRoomTypesList([newRoom, ...roomTypesList]);
    setIsAddRoomOpen(false);
    setNewRoomName("");
  };

  const totalManagedRooms = hotelsList.reduce((acc, h) => acc + h.totalRooms, 0);
  const totalAvailableRooms = hotelsList.reduce((acc, h) => acc + h.availableRooms, 0);
  const totalOccupiedRooms = hotelsList.reduce((acc, h) => acc + h.occupiedRooms, 0);
  const overallOccupancy = Math.round((totalOccupiedRooms / totalManagedRooms) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageIntro
        title="Hotels & Rooms Portfolio"
        description="Manage properties, room inventory, category specifications, and operational status."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsAddRoomOpen(true)} className="gap-2">
              <Plus className="size-4" /> Add Room Type
            </Button>
            <Button onClick={() => setIsAddHotelOpen(true)} className="gap-2">
              <Building2 className="size-4" /> Add Property
            </Button>
          </div>
        }
      />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Properties Managed</p>
            <Building2 className="size-4 text-primary" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">{hotelsList.length}</p>
          <p className="mt-1 text-xs text-success">Across 5 primary regions</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Rooms</p>
            <BedDouble className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">{totalManagedRooms}</p>
          <p className="mt-1 text-xs text-muted-foreground">{totalAvailableRooms} available tonight</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Portfolio Occupancy</p>
            <Users className="size-4 text-info" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">{overallOccupancy}%</p>
          <p className="mt-1 text-xs text-success">+5.6% vs target</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Maintenance / Blocked</p>
            <Wrench className="size-4 text-warning" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">
            {hotelsList.filter((h) => h.status === "Maintenance").length + 1}
          </p>
          <p className="mt-1 text-xs text-warning-foreground">Scheduled for service</p>
        </Card>
      </div>

      {/* Navigation Switch Tabs */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("hotels")}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === "hotels"
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Hotel Properties ({hotelsList.length})
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === "rooms"
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Room Types & Inventory ({roomTypesList.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search hotel or room..."
              value={searchHotelQuery}
              onChange={(e) => setSearchHotelQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>
      </Card>

      {/* View 1: Hotel Properties Table */}
      {activeTab === "hotels" && (
        <Card>
          <CardHead
            title="Hotel Portfolio"
            subtitle="Overview of active properties, room allocations, and daily rates"
          />
          <TableWrap>
            <thead>
              <tr>
                {["Property Name", "Location", "Total Rooms", "Available", "Occupied", "ADR", "Status", "Actions"].map(
                  (x) => (
                    <Th key={x}>{x}</Th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((h) => (
                <tr key={h.id} className="transition-colors hover:bg-muted/30">
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 font-display text-sm font-semibold text-primary">
                        {h.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{h.name}</p>
                        <p className="text-[11px] text-muted-foreground">{h.contactEmail}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-xs">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3 text-muted-foreground" /> {h.location}
                    </span>
                  </Td>
                  <Td className="font-medium">{h.totalRooms}</Td>
                  <Td className="text-success font-medium">{h.availableRooms}</Td>
                  <Td className="text-info font-medium">{h.occupiedRooms}</Td>
                  <Td className="font-semibold text-foreground">{h.adr}</Td>
                  <Td>
                    <StatusBadge tone={getHotelStatusTone(h.status)}>{h.status}</StatusBadge>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setEditingHotel(h)}
                      >
                        Edit Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Property Options</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setEditingHotel(h)}>
                            <Edit className="mr-2 size-4" /> Edit Configuration
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setActiveTab("rooms")}>
                            <Bed className="mr-2 size-4" /> Manage Room Types
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              setHotelsList((prev) =>
                                prev.map((item) =>
                                  item.id === h.id
                                    ? {
                                        ...item,
                                        status: item.status === "Active" ? "Maintenance" : "Active",
                                      }
                                    : item
                                )
                              )
                            }
                          >
                            <Wrench className="mr-2 size-4 text-warning" /> Toggle Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
      )}

      {/* View 2: Room Types & Inventory Table */}
      {activeTab === "rooms" && (
        <Card>
          <CardHead
            title="Room Types & Inventory"
            subtitle="Configured room categories, pricing, max occupancy, and inventory status"
            action={
              <Button size="sm" onClick={() => setIsAddRoomOpen(true)} className="gap-1.5 text-xs">
                <Plus className="size-3.5" /> Add Room Category
              </Button>
            }
          />
          <TableWrap>
            <thead>
              <tr>
                {["Room Type", "Assigned Hotel", "Inventory", "Available", "Max Guests", "Nightly Rate", "Status", "Actions"].map(
                  (x) => (
                    <Th key={x}>{x}</Th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {roomTypesList.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-muted/30">
                  <Td>
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-[11px] text-muted-foreground">{r.amenities.slice(0, 2).join(" • ")}</p>
                    </div>
                  </Td>
                  <Td className="text-xs font-medium text-foreground">{r.hotelName}</Td>
                  <Td className="font-medium">{r.totalInventory} units</Td>
                  <Td className="font-semibold text-success">{r.availableInventory}</Td>
                  <Td className="text-xs">{r.maxGuests} Guests</Td>
                  <Td className="font-semibold text-foreground">{r.basePrice}</Td>
                  <Td>
                    <StatusBadge tone={getRoomStatusTone(r.status)}>{r.status}</StatusBadge>
                  </Td>
                  <Td>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Update Price
                    </Button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
      )}

      {/* Modal 1: Add New Hotel Property */}
      {isAddHotelOpen && (
        <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
          <DialogContent className="max-w-md">
            <form onSubmit={handleAddHotelSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Hotel Property</DialogTitle>
                <DialogDescription>
                  Register a new property into the booking engine portfolio.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-4 text-xs">
                <Field label="Property Name">
                  <Input
                    required
                    placeholder="e.g. Royal Orchid Resort"
                    value={newHotelName}
                    onChange={(e) => setNewHotelName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <Field label="City / Location">
                  <Input
                    required
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={newHotelLocation}
                    onChange={(e) => setNewHotelLocation(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Total Room Count">
                    <Input
                      type="number"
                      value={newTotalRooms}
                      onChange={(e) => setNewTotalRooms(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </Field>
                  <Field label="Base ADR (₹)">
                    <Input
                      type="number"
                      value={newAdr}
                      onChange={(e) => setNewAdr(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </Field>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" type="button" onClick={() => setIsAddHotelOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Property</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal 2: Add New Room Type */}
      {isAddRoomOpen && (
        <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
          <DialogContent className="max-w-md">
            <form onSubmit={handleAddRoomSubmit}>
              <DialogHeader>
                <DialogTitle>Add Room Category</DialogTitle>
                <DialogDescription>
                  Configure a room category and allocate units to a hotel property.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-4 text-xs">
                <Field label="Room Category Name">
                  <Input
                    required
                    placeholder="e.g. Deluxe Garden Suite"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>

                <Field label="Assign to Hotel">
                  <select
                    value={newRoomHotel}
                    onChange={(e) => setNewRoomHotel(e.target.value)}
                    className={inputClass}
                  >
                    {hotelsList.map((h) => (
                      <option key={h.id} value={h.name}>
                        {h.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Total Inventory Units">
                    <Input
                      type="number"
                      value={newRoomInventory}
                      onChange={(e) => setNewRoomInventory(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </Field>
                  <Field label="Nightly Rate (₹)">
                    <Input
                      type="number"
                      value={newRoomPrice}
                      onChange={(e) => setNewRoomPrice(e.target.value)}
                      className="h-9 text-xs"
                    />
                  </Field>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" type="button" onClick={() => setIsAddRoomOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Category</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal 3: Edit Property Details */}
      {editingHotel && (
        <Dialog open={!!editingHotel} onOpenChange={() => setEditingHotel(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Property: {editingHotel.name}</DialogTitle>
              <DialogDescription>Update property parameters and operational status.</DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <Field label="Location">
                <Input defaultValue={editingHotel.location} className="h-9 text-xs" />
              </Field>

              <Field label="Contact Email">
                <Input defaultValue={editingHotel.contactEmail} className="h-9 text-xs" />
              </Field>

              <Field label="Operating Status">
                <select
                  defaultValue={editingHotel.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as HotelStatus;
                    setHotelsList((prev) =>
                      prev.map((item) =>
                        item.id === editingHotel.id ? { ...item, status: newStatus } : item
                      )
                    );
                  }}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </Field>
            </div>

            <DialogFooter>
              <Button onClick={() => setEditingHotel(null)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
