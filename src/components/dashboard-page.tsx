"use client";

import Link from "next/link";
import { BarChart3, BedDouble, Building2, CalendarDays, CircleDollarSign, Percent, Plus, TicketPercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHead, StatusBadge, TableWrap, Td, Th } from "@/components/admin-ui";

const kpis = [
  ["Total Bookings", "2,845", "+12.5% from last month", CalendarDays, "positive"],
  ["Pending Bookings", "126", "18 new today", CalendarDays, "warning"],
  ["Confirmed Bookings", "2,412", "+8.4% from last month", BedDouble, "positive"],
  ["Cancelled Bookings", "307", "-3.2% from last month", CalendarDays, "negative"],
  ["Booking Revenue", "₹18,42,500", "+14.8% from last month", CircleDollarSign, "positive"],
  ["Occupancy Rate", "78.4%", "+5.6% from last month", BarChart3, "positive"],
] as const;
const bookings = [
  ["BK-10245","Rahul Kumar","Grand Palace Hotel","Deluxe Room","20 Sep 2026","22 Sep 2026","₹10,620","Confirmed"],
  ["BK-10244","Priya Seshadri","Azure Residency","Executive","21 Sep 2026","24 Sep 2026","₹21,400","Pending"],
  ["BK-10243","Arjun Mehta","Marina Bay Suites","Suite","18 Sep 2026","20 Sep 2026","₹8,950","Completed"],
  ["BK-10242","Sana Iyer","Veranda Grand","Deluxe Room","23 Sep 2026","26 Sep 2026","₹15,300","Cancelled"],
];
const hotels = [
  ["Grand Palace Hotel","Chennai","428","₹4,82,500","84%"],
  ["Marina Bay Suites","Mumbai","376","₹3,94,200","81%"],
  ["Azure Residency","Goa","322","₹3,12,800","79%"],
  ["Veranda Grand","Bengaluru","295","₹2,86,400","77%"],
  ["The Fern Court","Kochi","241","₹2,18,900","73%"],
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Tuesday, 15 September 2026 · Live operations</p>
          <p className="mt-1 text-xs text-muted-foreground">Across 42 properties · 850 rooms under management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><CalendarDays/>Last 30 days</Button>
          <Button><Plus/>New booking</Button>
        </div>
      </div>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        {kpis.map(([label,value,note,Icon,tone], i)=>(
          <Card key={label} className="fade-rise p-4" style={{animationDelay:`${i*40}ms`} as React.CSSProperties}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <Icon className="size-4 shrink-0 text-muted-foreground"/>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
            <p className={`mt-1.5 text-xs ${tone==="positive"?"text-success":tone==="warning"?"text-warning-foreground":"text-destructive"}`}>{note}</p>
          </Card>
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHead title="Booking Trends" subtitle="Total, confirmed, and cancelled bookings" action={
            <select className="h-8 rounded-md border border-input bg-background px-2 text-xs">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          }/>
          <div className="p-5">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-primary"/>Total bookings</span>
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-info"/>Confirmed</span>
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-destructive"/>Cancelled</span>
            </div>
            <svg viewBox="0 0 700 230" className="mt-4 h-56 w-full" preserveAspectRatio="none" aria-label="Booking trends chart">
              <defs>
                <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--primary)" stopOpacity=".18"/>
                  <stop offset="1" stopColor="var(--primary)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {[40,90,140,190].map(y=><line key={y} x1="0" y1={y} x2="700" y2={y} stroke="var(--border)"/>)}
              <path d="M0 180 C75 165 115 130 180 140 S300 95 370 105 490 52 560 74 650 35 700 48 L700 230 L0 230Z" fill="url(#fill)"/>
              <path d="M0 180 C75 165 115 130 180 140 S300 95 370 105 490 52 560 74 650 35 700 48" fill="none" stroke="var(--primary)" strokeWidth="3"/>
              <path d="M0 195 C100 185 160 168 235 172 S390 140 470 148 600 120 700 126" fill="none" stroke="var(--info)" strokeWidth="2"/>
              <path d="M0 212 C130 207 220 198 310 202 S480 188 570 194 650 180 700 185" fill="none" stroke="var(--destructive)" strokeWidth="2"/>
            </svg>
            <div className="flex justify-between text-[10px] uppercase text-muted-foreground">
              <span>22 Aug</span><span>29 Aug</span><span>05 Sep</span><span>12 Sep</span><span>18 Sep</span>
            </div>
          </div>
        </Card>
        <Card>
          <CardHead title="Revenue Overview" subtitle="September 2026" action={<Button variant="ghost" size="sm">Change</Button>}/>
          <div className="space-y-5 p-5">
            {[["Room Revenue","₹15.2L","82%","bg-primary"],["Taxes","₹1.4L","34%","bg-info"],["Discounts","₹0.9L","18%","bg-warning"]].map(([n,v,w,c])=>(
              <div key={n}>
                <div className="mb-2 flex justify-between text-xs"><span className="text-muted-foreground">{n}</span><b>{v}</b></div>
                <div className="h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${c}`} style={{width:w}}/></div>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">Net Revenue</p>
              <p className="mt-1 font-display text-2xl font-semibold">₹16.9L</p>
              <p className="mt-1 text-xs text-success">+14.8% from last month</p>
            </div>
          </div>
        </Card>
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHead title="Recent Bookings" action={
            <Button asChild variant="link" size="sm">
              <Link href="/bookings">View all</Link>
            </Button>
          }/>
          <TableWrap>
            <thead>
              <tr>{["Booking ID","Guest","Hotel / Room","Check-in","Check-out","Amount","Status","Action"].map(x=><Th key={x}>{x}</Th>)}</tr>
            </thead>
            <tbody>
              {bookings.map(r=>(
                <tr key={r[0]} className="hover:bg-muted/35">
                  <Td className="font-medium">{r[0]}</Td>
                  <Td>{r[1]}</Td>
                  <Td><b className="block font-medium">{r[2]}</b><span className="text-xs text-muted-foreground">{r[3]}</span></Td>
                  <Td>{r[4]}</Td>
                  <Td>{r[5]}</Td>
                  <Td className="font-medium">{r[6]}</Td>
                  <Td><StatusBadge tone={r[7]==="Confirmed"?"success":r[7]==="Pending"?"warning":r[7]==="Cancelled"?"danger":"neutral"}>{r[7]}</StatusBadge></Td>
                  <Td><Button variant="ghost" size="sm">View</Button></Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
        <Card>
          <CardHead title="Booking Status" subtitle="Current distribution"/>
          <div className="flex items-center gap-6 p-5">
            <div className="grid size-32 shrink-0 place-items-center rounded-full bg-[conic-gradient(var(--primary)_0_68%,var(--info)_68%_86%,var(--warning)_86%_94%,var(--destructive)_94%)]">
              <div className="grid size-20 place-items-center rounded-full bg-card text-center">
                <span><b className="block font-display text-lg">2,845</b><small className="text-muted-foreground">total</small></span>
              </div>
            </div>
            <ul className="flex-1 space-y-3 text-sm">
              {[["Confirmed","68%","bg-primary"],["Completed","18%","bg-info"],["Pending","8%","bg-warning"],["Cancelled","6%","bg-destructive"]].map(([n,p,c])=>(
                <li className="flex justify-between gap-3" key={n}>
                  <span className="flex items-center gap-2 text-muted-foreground"><i className={`size-2 rounded-full ${c}`}/>{n}</span>
                  <b>{p}</b>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHead title="Top Performing Hotels"/>
          <TableWrap>
            <thead>
              <tr>{["Hotel","Location","Bookings","Revenue","Occupancy","Status"].map(x=><Th key={x}>{x}</Th>)}</tr>
            </thead>
            <tbody>
              {hotels.map(r=>(
                <tr key={r[0]}>
                  <Td className="font-medium">{r[0]}</Td>
                  {r.slice(1).map((v,i)=><Td key={v}>{i===4?<StatusBadge tone="success">Active</StatusBadge>:v}</Td>)}
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHead title="Room Availability" action={
              <Button asChild variant="ghost" size="sm">
                <Link href="/availability">Calendar</Link>
              </Button>
            }/>
            <div className="grid grid-cols-2 gap-3 p-5">
              {[["Total Rooms","850","neutral"],["Available","214","success"],["Booked","526","info"],["Blocked","110","danger"]].map(([n,v,t])=>(
                <div className="rounded-md bg-muted p-3" key={n}>
                  <p className="text-xs text-muted-foreground">{n}</p>
                  <p className={`mt-1 font-display text-xl font-semibold ${t==="success"?"text-success":t==="danger"?"text-destructive":t==="info"?"text-info":""}`}>{v}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardHead title="Pending Actions"/>
            <div className="divide-y divide-border px-5">
              {[["Booking confirmations","24"],["Cancellation requests","8"],["Refund requests","5"],["Payment verification","3"]].map(([n,v])=>(
                <div className="flex items-center gap-3 py-3" key={n}>
                  <span className="min-w-0 flex-1 text-sm">{n}</span>
                  <b className="text-warning-foreground">{v}</b>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
      <Card>
        <CardHead title="Quick Actions"/>
        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 xl:grid-cols-6">
          {[["Add Hotel",Building2,"/hotels"],["Add Room",BedDouble,"/hotels"],["Add Rate",Percent,"/rates"],["Update Availability",CalendarDays,"/availability"],["Create Coupon",TicketPercent,"/coupons"],["View Bookings",CalendarDays,"/bookings"]].map(([n,I,to])=>{
            const Icon=I as typeof Building2;
            return (
              <Button key={n as string} asChild variant="outline" className="h-auto justify-start py-3">
                <Link href={to as string}><Icon/>{n as string}</Link>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}