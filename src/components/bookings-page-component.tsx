"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  FileSpreadsheet,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
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

type BookingStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";
type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  hotel: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  amount: string;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  createdAt: string;
}

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-10245",
    guestName: "Rahul Kumar",
    guestEmail: "rahul.k@example.com",
    guestPhone: "+91 98765 43210",
    hotel: "Grand Palace Hotel",
    roomType: "Deluxe Ocean View",
    checkIn: "20 Sep 2026",
    checkOut: "22 Sep 2026",
    nights: 2,
    guests: 2,
    amount: "₹10,620",
    paymentStatus: "Paid",
    status: "Confirmed",
    createdAt: "15 Sep 2026, 10:24 AM",
  },
  {
    id: "BK-10244",
    guestName: "Priya Seshadri",
    guestEmail: "priya.s@example.com",
    guestPhone: "+91 98123 45678",
    hotel: "Azure Residency",
    roomType: "Executive Suite",
    checkIn: "21 Sep 2026",
    checkOut: "24 Sep 2026",
    nights: 3,
    guests: 3,
    amount: "₹21,400",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "15 Sep 2026, 09:12 AM",
  },
  {
    id: "BK-10243",
    guestName: "Arjun Mehta",
    guestEmail: "arjun.m@example.com",
    guestPhone: "+91 99000 11223",
    hotel: "Marina Bay Suites",
    roomType: "Presidential Suite",
    checkIn: "18 Sep 2026",
    checkOut: "20 Sep 2026",
    nights: 2,
    guests: 2,
    amount: "₹28,950",
    paymentStatus: "Paid",
    status: "Completed",
    createdAt: "14 Sep 2026, 04:45 PM",
  },
  {
    id: "BK-10242",
    guestName: "Sana Iyer",
    guestEmail: "sana.i@example.com",
    guestPhone: "+91 97788 99001",
    hotel: "Veranda Grand",
    roomType: "Deluxe Garden Room",
    checkIn: "23 Sep 2026",
    checkOut: "26 Sep 2026",
    nights: 3,
    guests: 2,
    amount: "₹15,300",
    paymentStatus: "Refunded",
    status: "Cancelled",
    createdAt: "14 Sep 2026, 02:15 PM",
  },
  {
    id: "BK-10241",
    guestName: "Kiran Shah",
    guestEmail: "kiran.shah@example.com",
    guestPhone: "+91 95544 33221",
    hotel: "The Fern Court",
    roomType: "Executive Room",
    checkIn: "24 Sep 2026",
    checkOut: "25 Sep 2026",
    nights: 1,
    guests: 1,
    amount: "₹6,450",
    paymentStatus: "Paid",
    status: "Confirmed",
    createdAt: "14 Sep 2026, 11:05 AM",
  },
  {
    id: "BK-10240",
    guestName: "Deepak Verma",
    guestEmail: "deepak.v@example.com",
    guestPhone: "+91 94433 22110",
    hotel: "Grand Palace Hotel",
    roomType: "Heritage Villa",
    checkIn: "28 Sep 2026",
    checkOut: "01 Oct 2026",
    nights: 3,
    guests: 4,
    amount: "₹34,500",
    paymentStatus: "Paid",
    status: "Confirmed",
    createdAt: "13 Sep 2026, 06:30 PM",
  },
  {
    id: "BK-10239",
    guestName: "Ananya Roy",
    guestEmail: "ananya.r@example.com",
    guestPhone: "+91 93322 11009",
    hotel: "Azure Residency",
    roomType: "Standard Queen",
    checkIn: "20 Sep 2026",
    checkOut: "21 Sep 2026",
    nights: 1,
    guests: 2,
    amount: "₹4,800",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "13 Sep 2026, 01:20 PM",
  },
];

export function BookingsPageComponent() {
  const [bookingsList, setBookingsList] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>("All");
  const [selectedHotel, setSelectedHotel] = useState<string>("All");

  // Modals state
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);

  // New Booking form state
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newHotel, setNewHotel] = useState("Grand Palace Hotel");
  const [newRoomType, setNewRoomType] = useState("Deluxe Room");
  const [newCheckIn, setNewCheckIn] = useState("2026-09-25");
  const [newCheckOut, setNewCheckOut] = useState("2026-09-27");
  const [newAmount, setNewAmount] = useState("12500");

  const filteredBookings = bookingsList.filter((b) => {
    const matchesSearch =
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.hotel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusTab === "All" || b.status === selectedStatusTab;
    const matchesHotel = selectedHotel === "All" || b.hotel === selectedHotel;
    return matchesSearch && matchesStatus && matchesHotel;
  });

  const getStatusTone = (status: BookingStatus) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Completed":
        return "info";
      case "Cancelled":
        return "danger";
      default:
        return "neutral";
    }
  };

  const getPaymentTone = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Refunded":
        return "info";
      case "Failed":
        return "danger";
      default:
        return "neutral";
    }
  };

  const handleConfirmBooking = (id: string) => {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Confirmed", paymentStatus: "Paid" } : b))
    );
  };

  const handleCancelBookingSubmit = () => {
    if (!cancellingBooking) return;
    setBookingsList((prev) =>
      prev.map((b) =>
        b.id === cancellingBooking.id ? { ...b, status: "Cancelled", paymentStatus: "Refunded" } : b
      )
    );
    setCancellingBooking(null);
  };

  const handleCreateNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;

    const newBookingObj: Booking = {
      id: `BK-${Math.floor(10246 + Math.random() * 900)}`,
      guestName: newGuestName,
      guestEmail: newGuestEmail || `${newGuestName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      guestPhone: "+91 98000 12345",
      hotel: newHotel,
      roomType: newRoomType,
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      nights: 2,
      guests: 2,
      amount: `₹${Number(newAmount).toLocaleString("en-IN")}`,
      paymentStatus: "Paid",
      status: "Confirmed",
      createdAt: "Just now",
    };

    setBookingsList([newBookingObj, ...bookingsList]);
    setIsNewBookingOpen(false);
    setNewGuestName("");
    setNewGuestEmail("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageIntro
        title="Booking Management"
        description="Search, review, filter, and handle guest reservations across all properties."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <FileSpreadsheet className="size-4" /> Export CSV
            </Button>
            <Button onClick={() => setIsNewBookingOpen(true)} className="gap-2">
              <Plus className="size-4" /> New Booking
            </Button>
          </div>
        }
      />

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total Bookings</p>
            <CalendarDays className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">{bookingsList.length}</p>
          <p className="mt-1 text-xs text-success">+12.5% from last month</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Pending Action</p>
            <Clock className="size-4 text-warning" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">
            {bookingsList.filter((b) => b.status === "Pending").length}
          </p>
          <p className="mt-1 text-xs text-warning-foreground">Requires admin review</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Confirmed</p>
            <CheckCircle2 className="size-4 text-success" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">
            {bookingsList.filter((b) => b.status === "Confirmed").length}
          </p>
          <p className="mt-1 text-xs text-success">Guaranteed rooms</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Cancelled / Refunded</p>
            <XCircle className="size-4 text-destructive" />
          </div>
          <p className="mt-2 font-display text-2xl font-semibold">
            {bookingsList.filter((b) => b.status === "Cancelled").length}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Inventory released</p>
        </Card>
      </div>

      {/* Filter and Control Bar */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1 border-b border-border pb-3 lg:border-b-0 lg:pb-0">
            {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedStatusTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab}
                <span className="ml-1.5 rounded-full bg-background/20 px-1.5 py-0.5 text-[10px]">
                  {tab === "All"
                    ? bookingsList.length
                    : bookingsList.filter((b) => b.status === tab).length}
                </span>
              </button>
            ))}
          </div>

          {/* Search and Dropdown Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-60 flex-1 sm:flex-none">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search booking ID, guest, hotel…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>

            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className={`${inputClass} w-44 text-xs`}
            >
              <option value="All">All Properties</option>
              <option value="Grand Palace Hotel">Grand Palace Hotel</option>
              <option value="Azure Residency">Azure Residency</option>
              <option value="Marina Bay Suites">Marina Bay Suites</option>
              <option value="Veranda Grand">Veranda Grand</option>
              <option value="The Fern Court">The Fern Court</option>
            </select>

            {(searchQuery || selectedStatusTab !== "All" || selectedHotel !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatusTab("All");
                  setSelectedHotel("All");
                }}
                className="text-xs text-muted-foreground"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Main Table Card */}
      <Card>
        <CardHead
          title="Reservations List"
          subtitle={`Showing ${filteredBookings.length} of ${bookingsList.length} total reservations`}
        />

        <TableWrap>
          <thead>
            <tr>
              {["Booking ID", "Guest", "Hotel / Room", "Dates", "Nights", "Amount", "Payment", "Status", "Actions"].map(
                (x) => (
                  <Th key={x}>{x}</Th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-sm text-muted-foreground">
                  No reservations found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-muted/30">
                  <Td className="font-mono text-xs font-semibold text-primary">
                    <button
                      onClick={() => setViewingBooking(b)}
                      className="hover:underline focus:outline-none"
                    >
                      {b.id}
                    </button>
                  </Td>
                  <Td>
                    <div className="min-w-36">
                      <p className="font-medium text-foreground">{b.guestName}</p>
                      <p className="text-[11px] text-muted-foreground">{b.guestEmail}</p>
                    </div>
                  </Td>
                  <Td>
                    <div className="min-w-44">
                      <b className="block font-medium text-foreground">{b.hotel}</b>
                      <span className="text-xs text-muted-foreground">{b.roomType}</span>
                    </div>
                  </Td>
                  <Td className="whitespace-nowrap text-xs">
                    <p>{b.checkIn} – {b.checkOut}</p>
                  </Td>
                  <Td className="text-xs">{b.nights}n / {b.guests}g</Td>
                  <Td className="font-medium text-foreground">{b.amount}</Td>
                  <Td>
                    <StatusBadge tone={getPaymentTone(b.paymentStatus)}>
                      {b.paymentStatus}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <StatusBadge tone={getStatusTone(b.status)}>{b.status}</StatusBadge>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() => setViewingBooking(b)}
                        title="View details"
                      >
                        <Eye className="size-4" />
                      </Button>

                      {b.status === "Pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfirmBooking(b.id)}
                          className="h-7 bg-success/10 text-xs text-success hover:bg-success/20 hover:text-success border-success/30"
                        >
                          Confirm
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setViewingBooking(b)}>
                            <Eye className="mr-2 size-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleConfirmBooking(b.id)}>
                            <CheckCircle2 className="mr-2 size-4 text-success" /> Mark Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setCancellingBooking(b)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 size-4" /> Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </TableWrap>
      </Card>

      {/* View Booking Modal */}
      {viewingBooking && (
        <Dialog open={!!viewingBooking} onOpenChange={() => setViewingBooking(null)}>
          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <DialogTitle className="font-display text-lg">
                    Booking Details ({viewingBooking.id})
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    Created on {viewingBooking.createdAt}
                  </DialogDescription>
                </div>
                <StatusBadge tone={getStatusTone(viewingBooking.status)}>
                  {viewingBooking.status}
                </StatusBadge>
              </div>
            </DialogHeader>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Guest Name</p>
                  <p className="font-semibold text-foreground">{viewingBooking.guestName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-semibold text-foreground">{viewingBooking.guestPhone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{viewingBooking.guestEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Guests</p>
                  <p className="font-semibold text-foreground">{viewingBooking.guests} Adults</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-3">
                <p className="text-xs font-semibold text-muted-foreground">PROPERTY & ROOM</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Hotel:</span>
                  <span className="font-medium">{viewingBooking.hotel}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Room Type:</span>
                  <span className="font-medium">{viewingBooking.roomType}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Stay Dates:</span>
                  <span className="font-medium">
                    {viewingBooking.checkIn} to {viewingBooking.checkOut} ({viewingBooking.nights} nights)
                  </span>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-3">
                <p className="text-xs font-semibold text-muted-foreground">PAYMENT SUMMARY</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-foreground text-sm">{viewingBooking.amount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <StatusBadge tone={getPaymentTone(viewingBooking.paymentStatus)}>
                    {viewingBooking.paymentStatus}
                  </StatusBadge>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4 gap-2">
              <Button variant="outline" onClick={() => setViewingBooking(null)}>
                Close
              </Button>
              {viewingBooking.status === "Pending" && (
                <Button
                  onClick={() => {
                    handleConfirmBooking(viewingBooking.id);
                    setViewingBooking(null);
                  }}
                >
                  Confirm Booking
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Booking Modal */}
      {cancellingBooking && (
        <Dialog open={!!cancellingBooking} onOpenChange={() => setCancellingBooking(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-destructive">
                Cancel Booking {cancellingBooking.id}?
              </DialogTitle>
              <DialogDescription>
                This action will release room inventory for {cancellingBooking.hotel} ({cancellingBooking.roomType}) and process applicable refund.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="rounded border border-destructive/20 bg-destructive-soft p-3">
                <p className="font-semibold text-destructive">Refund Calculator</p>
                <p className="mt-1 text-foreground">
                  Original Amount: <b>{cancellingBooking.amount}</b>
                </p>
                <p className="text-muted-foreground">Eligible Refund (90%): <b>₹13,770</b> (10% cancellation policy applies)</p>
              </div>

              <Field label="Cancellation Reason">
                <select className={inputClass}>
                  <option>Guest request / Change of plans</option>
                  <option>Payment failure / expired hold</option>
                  <option>Travel disruption / Flight cancelled</option>
                  <option>Duplicate reservation</option>
                </select>
              </Field>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Keep Booking</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleCancelBookingSubmit}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create New Booking Modal */}
      {isNewBookingOpen && (
        <Dialog open={isNewBookingOpen} onOpenChange={setIsNewBookingOpen}>
          <DialogContent className="max-w-lg">
            <form onSubmit={handleCreateNewBooking}>
              <DialogHeader>
                <DialogTitle>Create New Reservation</DialogTitle>
                <DialogDescription>
                  Manually book a room for a walk-in or direct guest inquiry.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-4 sm:grid-cols-2 text-xs">
                <Field label="Guest Full Name">
                  <Input
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <Field label="Guest Email">
                  <Input
                    type="email"
                    placeholder="vikram@example.com"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <Field label="Hotel Property">
                  <select
                    value={newHotel}
                    onChange={(e) => setNewHotel(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Grand Palace Hotel">Grand Palace Hotel</option>
                    <option value="Azure Residency">Azure Residency</option>
                    <option value="Marina Bay Suites">Marina Bay Suites</option>
                    <option value="Veranda Grand">Veranda Grand</option>
                    <option value="The Fern Court">The Fern Court</option>
                  </select>
                </Field>
                <Field label="Room Type">
                  <select
                    value={newRoomType}
                    onChange={(e) => setNewRoomType(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Deluxe Room">Deluxe Room</option>
                    <option value="Executive Suite">Executive Suite</option>
                    <option value="Presidential Suite">Presidential Suite</option>
                    <option value="Heritage Villa">Heritage Villa</option>
                  </select>
                </Field>
                <Field label="Check-in Date">
                  <Input
                    type="date"
                    value={newCheckIn}
                    onChange={(e) => setNewCheckIn(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <Field label="Check-out Date">
                  <Input
                    type="date"
                    value={newCheckOut}
                    onChange={(e) => setNewCheckOut(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
                <Field label="Total Amount (₹)">
                  <Input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="h-9 text-xs"
                  />
                </Field>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" type="button" onClick={() => setIsNewBookingOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Reservation</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
