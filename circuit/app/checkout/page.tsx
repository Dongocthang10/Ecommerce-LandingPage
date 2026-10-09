"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, CreditCard, Headphones, Landmark, Laptop,
  Lock, Minus, Plus, ShieldCheck, Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const fmtExp = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const initialItems = [
  { id: 1, name: "Aero 15 Laptop", detail: "16 GB / 512 GB, Silver", price: 1299, qty: 1, icon: Laptop },
  { id: 2, name: "Hush ANC Headphones", detail: "Midnight blue", price: 229, qty: 1, icon: Headphones },
];
const delivery = [
  { id: "standard", label: "Standard", note: "3-5 business days", price: 0 },
  { id: "express", label: "Express", note: "Next business day", price: 24 },
];
const methods = [
  { id: "card", label: "Credit or debit card", icon: CreditCard },
  { id: "wallet", label: "Digital wallet", icon: Wallet },
  { id: "bank", label: "Bank transfer", icon: Landmark },
];

function Field({ label, id, className, ...props }: React.ComponentProps<typeof Input> & { label: string; id: string }) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} required {...props} />
    </div>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>
);

export default function CheckoutPage() {
  const [items, setItems] = useState(initialItems);
  const [ship, setShip] = useState("standard");
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", exp: "", cvc: "" });
  const [status, setStatus] = useState<"idle" | "processing" | "paid">("idle");
  const [order, setOrder] = useState(0);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = delivery.find((d) => d.id === ship)!.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const setQty = (id: number, d: number) =>
    setItems((l) => l.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)));

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    // TODO: replace this simulation with a real payment call (for example a Stripe
    // PaymentIntent created in a server action or route handler). Never handle raw
    // card data on your own server; use Stripe Elements or a similar hosted field.
    setTimeout(() => {
      setOrder(Math.floor(100000 + Math.random() * 900000));
      setStatus("paid");
    }, 1500);
  };

  if (status === "paid")
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center">
        <CheckCircle2 className="size-14 text-primary" strokeWidth={1.5} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Payment received</h1>
        <p className="mt-3 text-muted-foreground">
          Order #CR-{order} is confirmed. A receipt is on its way to your inbox and your devices ship within 24 hours.
        </p>
        <Button asChild className="mt-8"><Link href="/">Back to the store</Link></Button>
      </main>
    );

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to store
          </Link>
          <span className="text-xl font-bold tracking-tight">Winnify</span>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
              <Lock className="size-4" /> Secure checkout
            </span>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <form onSubmit={pay} className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Contact</h2>
            <Field id="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="first" label="First name" autoComplete="given-name" />
              <Field id="last" label="Last name" autoComplete="family-name" />
              <Field id="address" label="Address" className="sm:col-span-2" autoComplete="street-address" />
              <Field id="city" label="City" autoComplete="address-level2" />
              <Field id="zip" label="Postal code" autoComplete="postal-code" />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Delivery</h2>
            <RadioGroup value={ship} onValueChange={setShip} className="grid gap-3 sm:grid-cols-2">
              {delivery.map((d) => (
                <Label key={d.id} htmlFor={d.id} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem id={d.id} value={d.id} />
                  <span className="flex-1">
                    <span className="block font-medium">{d.label}</span>
                    <span className="block text-sm font-normal text-muted-foreground">{d.note}</span>
                  </span>
                  <span className="font-medium">{d.price ? money(d.price) : "Free"}</span>
                </Label>
              ))}
            </RadioGroup>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Payment</h2>
            <RadioGroup value={method} onValueChange={setMethod} className="grid gap-3">
              {methods.map(({ id, label, icon: Icon }) => (
                <Label key={id} htmlFor={`pm-${id}`} className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem id={`pm-${id}`} value={id} />
                  <Icon className="size-5 text-muted-foreground" />
                  {label}
                </Label>
              ))}
            </RadioGroup>

            {method === "card" ? (
              <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
                <Field id="name" label="Name on card" className="sm:col-span-2" autoComplete="cc-name" />
                <Field id="number" label="Card number" className="sm:col-span-2" inputMode="numeric" placeholder="1234 5678 9012 3456" autoComplete="cc-number" minLength={19}
                  value={card.number} onChange={(e) => setCard({ ...card, number: fmtCard(e.target.value) })} />
                <Field id="exp" label="Expiry" inputMode="numeric" placeholder="MM/YY" autoComplete="cc-exp" minLength={5}
                  value={card.exp} onChange={(e) => setCard({ ...card, exp: fmtExp(e.target.value) })} />
                <Field id="cvc" label="CVC" inputMode="numeric" placeholder="123" autoComplete="cc-csc" minLength={3}
                  value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
              </div>
            ) : (
              <p className="rounded-lg border p-4 text-sm text-muted-foreground">
                {method === "wallet"
                  ? "You will be redirected to your wallet provider to confirm the payment."
                  : "Bank details appear after you place the order. Your devices ship once the transfer clears."}
              </p>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="space-y-5 rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-medium">Order summary</h2>
            <ul className="space-y-4">
              {items.map(({ id, name, detail, price, qty, icon: Icon }) => (
                <li key={id} className="flex gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-8 text-muted-foreground" strokeWidth={1.25} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon" className="size-7" onClick={() => setQty(id, -1)} aria-label={`Decrease ${name}`}><Minus className="size-3" /></Button>
                      <span className="w-5 text-center text-sm">{qty}</span>
                      <Button type="button" variant="outline" size="icon" className="size-7" onClick={() => setQty(id, 1)} aria-label={`Increase ${name}`}><Plus className="size-3" /></Button>
                    </div>
                  </div>
                  <p className="font-medium">{money(price * qty)}</p>
                </li>
              ))}
            </ul>
            <Separator />
            <dl className="space-y-2 text-sm">
              <Row label="Subtotal" value={money(subtotal)} />
              <Row label="Shipping" value={shipping ? money(shipping) : "Free"} />
              <Row label="Estimated tax (8%)" value={money(tax)} />
            </dl>
            <Separator />
            <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>{money(total)}</span></div>
            <Button type="submit" size="lg" className="w-full" disabled={status === "processing"}>
              {status === "processing" ? "Processing..." : `Pay ${money(total)}`}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-4" /> Encrypted payment. 30-day free returns.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
