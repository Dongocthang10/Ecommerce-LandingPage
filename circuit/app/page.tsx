import Link from "next/link";
import {
  Headphones, Headset, Laptop, RefreshCcw, Search, ShieldCheck,
  Orbit, ShoppingCart, Smartphone, Star, Tablet, Truck, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const categories = [
  { name: "Phones", count: "120 models", icon: Smartphone },
  { name: "Laptops", count: "86 models", icon: Laptop },
  { name: "Tablets", count: "42 models", icon: Tablet },
  { name: "Audio", count: "95 models", icon: Headphones },
];

const products = [
  { name: "Aero 15 Laptop", category: "Laptops", price: "$1,299", was: "$1,499", rating: "4.8", reviews: "2,140", tag: "Save $200", icon: Laptop },
  { name: "Pulse 12 Phone", category: "Phones", price: "$799", rating: "4.7", reviews: "3,812", tag: "New", icon: Smartphone },
  { name: "Slate 11 Tablet", category: "Tablets", price: "$549", was: "$649", rating: "4.6", reviews: "968", tag: "Save $100", icon: Tablet },
  { name: "Hush ANC Headphones", category: "Audio", price: "$229", rating: "4.9", reviews: "5,430", tag: "Best seller", icon: Headphones },
];

const specs = [
  ["Display", "15.6 in OLED, 120 Hz"],
  ["Processor", "16-core, 3.4 GHz"],
  ["Battery", "Up to 18 hours"],
  ["Weight", "1.4 kg"],
];

const trust = [
  { icon: Truck, title: "Free 2-day shipping", text: "On orders over $50." },
  { icon: RefreshCcw, title: "30-day returns", text: "Return for any reason, free." },
  { icon: ShieldCheck, title: "2-year warranty", text: "On every device we sell." },
  { icon: Headset, title: "Real human support", text: "Chat or call, 7 days a week." },
];

const steps = [
  "Tell us the model and condition of your old phone.",
  "Ship it with the prepaid label we email you.",
  "Get credit toward your new device once it arrives.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Orbit className="size-5 text-primary" /> Winnify
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {categories.map((c) => (
              <Link key={c.name} href="#categories" className="hover:text-foreground">{c.name}</Link>
            ))}
            <Link href="#deals" className="hover:text-foreground">Deals</Link>
          </nav>
          <div className="relative ml-auto hidden w-64 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search devices" className="pl-9" aria-label="Search devices" />
          </div>
          <div className="ml-auto sm:ml-0"><ThemeToggle /></div>
          <Button variant="outline" size="icon" className="relative" aria-label="Open cart">
            <Link href="/checkout">
            <ShoppingCart className="size-4" />
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">2</span>
            </Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
          <div>
            <Badge variant="secondary" className="rounded-full px-3 py-1">Free 2-day shipping over $50</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Premium devices, launched to your door.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Phones, laptops, tablets and audio from brands you know, with free returns for 30 days and a two-year warranty on everything.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg"><Link href="#products">Shop new arrivals</Link></Button>
              <Button size="lg" variant="outline"><Link href="#deals">See weekly deals</Link></Button>
            </div>
          </div>

          {/* Product spotlight */}
          <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <div className="relative flex h-56 items-center justify-center overflow-hidden bg-muted">
              <div className="absolute size-44 rounded-full border border-primary/40" />
              <div className="orbit absolute size-72 rounded-full border border-dashed border-primary/30">
                <span className="absolute -top-1 left-1/2 size-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
              </div>
              <Laptop className="relative size-24 text-foreground" strokeWidth={1} />
              <Badge className="absolute left-4 top-4">Save $200</Badge>
            </div>
            <div className="p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">Aero 15 Laptop</h2>
                <p className="text-xl font-semibold">$1,299 <span className="text-sm font-normal text-muted-foreground line-through">$1,499</span></p>
              </div>
              <dl className="mt-4 divide-y text-sm">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <Button className="mt-5 w-full" size="lg"><Link href="/checkout">Buy now</Link></Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-4">
            {categories.map(({ name, count, icon: Icon }) => (
              <Link key={name} href="#products" className="group flex items-center gap-4 bg-background p-6 transition-colors hover:bg-muted">
                <Icon className="size-8 text-muted-foreground group-hover:text-foreground" strokeWidth={1.5} />
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">Popular this week</h2>
            <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline">View all products</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article key={p.name} className="group">
                <div className="relative flex aspect-square items-center justify-center rounded-xl bg-muted">
                  <p.icon className="size-20 text-muted-foreground transition-colors group-hover:text-foreground" strokeWidth={1} />
                  <Badge variant="secondary" className="absolute left-3 top-3 bg-background">{p.tag}</Badge>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{p.category}</p>
                    <h3 className="font-medium">{p.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-current text-foreground" /> {p.rating} ({p.reviews})
                    </p>
                    <p className="mt-2 font-semibold">
                      {p.price} {p.was && <span className="text-sm font-normal text-muted-foreground line-through">{p.was}</span>}
                    </p>
                  </div>
                  <Button size="icon" variant="outline" aria-label={`Add ${p.name} to cart`}><Plus className="size-4" /></Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Trade-in deal */}
        <section id="deals" className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 nebula rounded-3xl p-8 md:grid-cols-2 md:p-14">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trade in your old phone and save up to $400.</h2>
              <p className="mt-4 max-w-sm opacity-70">Any brand, any condition. We recycle what we cannot resell.</p>
              <Button size="lg" className="mt-8 bg-white text-indigo-950 hover:bg-white/90"><Link href="#">Get a trade-in quote</Link></Button>
            </div>
            <ol className="space-y-5 self-center">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/40 text-sm">{i + 1}</span>
                  <p className="pt-1">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Trust */}
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3">
              <Icon className="mt-0.5 size-6 shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-medium">Get deal alerts</p>
            <p className="mt-1 text-sm text-muted-foreground">One email a week with price drops. Unsubscribe any time.</p>
            <form className="mt-4 flex max-w-sm gap-2">
              <Input type="email" placeholder="you@example.com" aria-label="Email address" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          {[
            ["Shop", ["Phones", "Laptops", "Tablets", "Audio"]],
            ["Support", ["Order tracking", "Returns", "Warranty", "Contact us"]],
            ["Company", ["About", "Careers", "Press", "Sustainability"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <p className="font-medium">{title as string}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {(links as string[]).map((l) => (
                  <li key={l}><Link href="#" className="hover:text-foreground">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="border-t py-6 text-center text-sm text-muted-foreground">© 2026 Winnify. All rights reserved.</p>
      </footer>
    </div>
  );
}
