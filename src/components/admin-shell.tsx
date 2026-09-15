"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  Menu,
  Percent,
  Search,
  Settings,
  Tags,
  TicketX,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Bookings", to: "/bookings", icon: CalendarDays },
  { label: "Hotels & Rooms", to: "/hotels", icon: Building2 },
  { label: "Rates & Pricing", to: "/rates", icon: Percent },
  { label: "Availability", to: "/availability", icon: BedDouble },
  { label: "Coupons & Offers", to: "/coupons", icon: Tags },
  { label: "Cancellations", to: "/cancellations", icon: TicketX },
  { label: "Payments", to: "/payments", icon: CreditCard },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

function Sidebar({
  compact,
  setCompact,
  mobile,
  close,
}: {
  compact: boolean;
  setCompact?: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
  close?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isExpanded = mobile || !compact || isHovered;

  return (
    <aside
      onMouseEnter={() => !mobile && setIsHovered(true)}
      onMouseLeave={() => !mobile && setIsHovered(false)}
      className={cn(
        "flex h-dvh shrink-0 flex-col bg-rail text-rail-foreground border-r border-rail-line transition-all duration-300 ease-in-out overflow-hidden",
        !mobile && "fixed top-0 left-0 z-40",
        compact && !isHovered ? "w-16" : "w-56",
        compact && isHovered && "z-50 shadow-2xl ring-1 ring-white/10",
        mobile && "relative z-10 w-64"
      )}
    >
      {/* Header Branding */}
      <div className="flex h-14 items-center justify-between border-b border-rail-line px-3.5 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-sm">
            H
          </div>
          {isExpanded && (
            <div className="min-w-0 flex-1 transition-opacity duration-200">
              <p className="truncate font-display text-xs font-semibold text-rail-bright">HotelBook Admin</p>
              <p className="text-[9px] uppercase tracking-wider text-rail-muted">Booking Engine</p>
            </div>
          )}
        </div>
        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-rail-muted hover:bg-rail-hover hover:text-rail-bright rounded-md shrink-0"
            onClick={close}
            aria-label="Close menu"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Section Heading */}
      {isExpanded && (
        <p className="px-3.5 pb-1 pt-3 text-[9px] font-semibold uppercase tracking-widest text-rail-muted/80 shrink-0">
          Operations
        </p>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto no-scrollbar px-2 py-1.5" aria-label="Primary navigation">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              href={item.to}
              onClick={close}
              title={!isExpanded ? item.label : undefined}
              className={cn(
                "group relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-xs transition-all",
                isActive
                  ? "bg-rail-active text-rail-bright font-medium shadow-sm"
                  : "text-rail-muted hover:bg-rail-hover hover:text-rail-bright"
              )}
            >
              <span
                className={cn(
                  "absolute left-0 h-4 w-1 rounded-r bg-primary transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
              <Icon className="size-4 shrink-0" />
              {isExpanded && <span className="truncate text-xs">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Profile Footer */}
      <div className="p-2 border-t border-rail-line shrink-0">
        <div className="flex items-center gap-2.5 rounded-lg bg-rail-raised p-2">
          <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/20 text-[10px] font-semibold text-primary">
            MN
          </div>
          {isExpanded && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-rail-bright">Meera Nair</p>
                <p className="text-[10px] text-rail-muted">Administrator</p>
              </div>
              <ChevronDown className="size-3.5 text-rail-muted shrink-0" />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [compact, setCompact] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const current = nav.find((item) => item.to === "/" ? pathname === "/" : pathname.startsWith(item.to))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block">
        <Sidebar compact={compact} setCompact={setCompact} />
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-fit">
            <Sidebar compact={false} mobile close={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div
        className={cn(
          "min-w-0 transition-[margin-left] duration-300 ease-in-out",
          compact ? "lg:ml-16" : "lg:ml-56"
        )}
      >
        <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                variant="outline"
                size="icon"
                className="size-8 lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>

              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Admin <span className="mx-1">/</span> Booking Engine
                </p>
                <h1 className="truncate font-display text-sm font-semibold sm:text-base">
                  {current === "Dashboard" ? "Booking Engine Dashboard" : current}
                </h1>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <label className="hidden h-8 items-center gap-2 rounded-md border border-input bg-background px-2.5 focus-within:ring-2 focus-within:ring-ring md:flex">
                <Search className="size-3.5 text-muted-foreground" />
                <input
                  className="w-40 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                  placeholder="Search bookings…"
                />
              </label>

              <Button variant="outline" size="icon" aria-label="Notifications" className="relative size-8">
                <Bell className="size-4" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-warning ring-2 ring-surface" />
              </Button>

              <Button variant="outline" size="icon" aria-label="Help" className="hidden size-8 sm:inline-flex">
                <CircleHelp className="size-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 gap-2 px-2.5 text-xs">
                    <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-[9px] font-semibold text-primary">
                      MN
                    </span>
                    <span className="hidden sm:inline font-medium">Meera</span>
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 text-xs">
                  <DropdownMenuLabel>Meera Nair</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 xl:p-8">{children}</main>
      </div>
    </div>
  );
}