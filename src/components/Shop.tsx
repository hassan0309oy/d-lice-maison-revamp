import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, ShieldCheck, ChefHat, Headphones, Heart, ChevronRight, Check, ShoppingBag } from "lucide-react";
import hero from "@/assets/hero-plate-ref.jpg";
import { LANG_KEY, LOGO_URL, PACKS, T, VIDEOS, type Lang } from "@/config/site";
import { Button } from "@/components/ui/button";
import { BlackFriday } from "@/components/BlackFriday";
import { RecipeDetails } from "@/components/RecipeDetails";
import { money, packPrice, promotionActive } from "@/lib/shop-rules";

const X = {
  fr: { slogan1: "Des recettes", slogan2: "délicieuses", slogan3: "à portée de clic !", sub1: "Rapides, gourmandes, simples à préparer", sub2: "et surtout", sub3: "pas chères !", side: "Le goût du fait maison à petit prix !", motto: "Cuisinez. Savourez. Recommencez !", see: "Voir la vidéo", apercu: "Découvrez un aperçu de nos recettes !", apercuSub: "Des plats savoureux, pour tous les goûts, et faciles à réaliser chez vous.", more: "Voir nos packs", trust: ["Livraison instantanée par email", "Paiement sécurisé 100% fiable", "Recettes testées et approuvées", "Support client réactif 7j/7", "Fait avec amour"], rights: "Tous droits réservés.", love: "Le plaisir de cuisiner, tout simplement." },
  en: { slogan1: "Delicious", slogan2: "recipes", slogan3: "just a click away!", sub1: "Quick, tasty, easy to make", sub2: "and above all", sub3: "affordable!", side: "Homemade taste at a small price!", motto: "Cook. Savour. Repeat!", see: "Watch the video", apercu: "Get a taste of our recipes!", apercuSub: "Tasty dishes for every taste, easy to make at home.", more: "See our packs", trust: ["Instant delivery by email", "100% secure payment", "Tested & approved recipes", "Responsive support 7/7", "Made with love"], rights: "All rights reserved.", love: "The joy of cooking, simply." },
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Shop({ lang }: { lang: Lang }) {
  const t = T[lang]; const x = X[lang];
  const ref = useReveal();
  const other: Lang = lang === "fr" ? "en" : "fr";
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const trustIcons = [Zap, ShieldCheck, ChefHat, Headphones, Heart];
  const best = PACKS.find(p => p.count === 60);
  const active = now !== null && promotionActive(now);

  return (
    <div ref={ref} className="overflow-x-hidden pb-24 md:pb-0">
      <BlackFriday lang={lang} now={now} />
      {/* HERO */}
      <section className="relative wave-bottom bg-cocoa pb-20">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-hero-fade" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Délices Maison" width={512} height={512} className="h-20 w-20 rounded-full shadow-cover ring-4 ring-cream md:h-28 md:w-28" />
            <div className="hidden sm:block">
              <p className="font-script text-3xl text-cream text-glow md:text-4xl">Délices Maison</p>
              <p className="font-script text-sm text-sun">{x.motto}</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Button asChild className="hidden rounded-full px-5 font-bold md:inline-flex"><a href="#packs">{t.packsTitle}</a></Button>
            <Button asChild className="h-auto rounded-full bg-cream px-4 py-2 text-sm font-extrabold text-cocoa shadow-soft hover:bg-cream">
              <Link to={other === "fr" ? "/fr" : "/en"} onClick={() => { try { localStorage.setItem(LANG_KEY, other); } catch { /* Storage is optional. */ } }}>
                <span className="emoji">{other === "fr" ? "🇫🇷" : "🇬🇧"}</span> {other === "fr" ? "Switch to French" : "Switch to English"}
              </Link>
            </Button>
          </nav>
        </header>
        <div className="relative mx-auto max-w-6xl px-5 pt-14 md:pt-20">
          <p className="absolute right-6 top-2 hidden max-w-[220px] rotate-[-6deg] font-script text-2xl text-cream text-glow lg:block">{x.side}</p>
          <div className="max-w-xl">
            <h1 className="font-script text-[2.1rem] leading-[1.15] text-cream text-glow sm:text-5xl md:text-6xl">
              {x.slogan1} <span className="text-sun">{x.slogan2}</span><br />{x.slogan3} <span className="emoji animate-floaty text-[0.55em]">😋</span>
            </h1>
            <p className="mt-6 text-lg font-bold text-cream text-glow md:text-xl">{x.sub1}<br />{x.sub2} <span className="text-sun">{x.sub3}</span></p>
            <Button asChild className="mt-8 h-auto whitespace-normal rounded-full bg-sun px-8 py-4 text-lg font-extrabold text-cocoa shadow-cover hover:bg-sun">
            <a href="#packs">
              {t.discover} <ChevronRight className="h-5 w-5" />
            </a></Button>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="scroll-mt-4 py-12">
        <h2 className="px-5 text-center font-script text-4xl text-primary md:text-5xl">{t.packsTitle}</h2>
        <p className="mt-2 px-5 text-center text-muted-foreground">{t.packsSub}</p>
        <div className="mx-auto mt-7 max-w-6xl px-5">
          <div className="mb-8 overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full table-fixed text-center text-sm">
              <caption className="p-4 text-left font-extrabold text-primary">{lang === "fr" ? "Comparez en un coup d’œil · Prix en USD" : "Compare at a glance · Prices in USD"}</caption>
              <thead><tr className="border-y border-border bg-secondary">{PACKS.map(p => <th key={p.id} scope="col" className="px-1 py-3">{p.count} {t.recipes}</th>)}</tr></thead>
              <tbody><tr>{PACKS.map(p => <td key={p.id} className="px-1 pt-4 text-lg font-extrabold text-primary">{money(packPrice(p.basePrice, p.count, now ?? 0), lang)}</td>)}</tr>
              <tr>{PACKS.map(p => <td key={p.id} className="px-1 py-3 text-xs text-muted-foreground">{money(packPrice(p.basePrice, p.count, now ?? 0) / p.count, lang)}<br />{lang === "fr" ? "par recette" : "per recipe"}</td>)}</tr></tbody>
            </table>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {PACKS.map((p) => { const price = packPrice(p.basePrice, p.count, now ?? 0); const discounted = price < p.basePrice; return (
              <article key={p.id} className={`relative flex min-w-0 flex-col gap-5 rounded-lg bg-card p-5 shadow-soft ring-1 ${p.featured ? "ring-accent" : "ring-border"}`}>
                {p.featured && <span className="absolute -top-3 right-5 z-10 rounded-full bg-cocoa px-4 py-1 text-xs font-extrabold uppercase text-cream shadow-soft">{t.popular}</span>}
                <div className="group mx-auto w-3/5 shrink-0 [perspective:1000px]">
                  <img src={p.cover[lang]} alt={p.name[lang]} width={1160} height={1355} className="w-full -rotate-2 rounded-lg shadow-cover transition duration-500 group-hover:rotate-0 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-script text-2xl leading-tight text-primary md:text-3xl">{p.name[lang]}</h3>
                  <p className="mt-2 text-sm font-bold text-foreground">{p.description[lang]}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.benefits[lang].map((b) => <li key={b} className="flex items-center gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-cocoa"><Check className="h-3 w-3" strokeWidth={4} /></span>{b}</li>)}
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    {discounted && <s className="font-price text-xl text-muted-foreground">{money(p.basePrice, lang)}</s>}
                    <span className="font-price text-4xl font-semibold text-primary">{money(price, lang)}</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-muted-foreground">{money(price / p.count, lang)} / {lang === "fr" ? "recette" : "recipe"}</p>
                  {discounted && <p className="mt-2 text-sm font-extrabold text-promotion">−40 % · {lang === "fr" ? "Économisez" : "Save"} {money(p.basePrice - price, lang)}</p>}
                  <Button asChild className="mt-4 h-auto whitespace-normal rounded-full bg-sun px-4 py-3 text-center font-extrabold text-cocoa shadow-soft hover:bg-sun"><a href={p.link[lang]} target="_blank" rel="noopener noreferrer">
                    {(() => { const [e, ...rest] = p.cta[lang].split(" "); return <><span className="emoji text-sm">{e}</span> {rest.join(" ")}</>; })()}
                  </a></Button>
                </div>
              </article>
            ); })}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border md:grid-cols-5">
          {x.trust.map((label, i) => { const I = trustIcons[i] ?? Heart; return (
            <div key={label} className="flex items-center gap-3 text-left last:col-span-2 md:last:col-span-1">
              <I className="h-8 w-8 shrink-0 text-accent" />
              <span className="text-sm font-bold">{label}</span>
            </div>); })}
        </div>
      </section>

      {/* VIDEO + REVIEWS */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-16 [&>*]:min-w-0">
        <div>
          <div className="overflow-hidden rounded-[2rem] shadow-cover ring-4 ring-card [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-video-marquee gap-4 py-4">
              {[...VIDEOS, ...VIDEOS].map((src, i) => (
                <video key={i} src={src} autoPlay muted loop playsInline preload="metadata" aria-hidden={i >= VIDEOS.length}
                  className="aspect-[9/16] w-40 shrink-0 rounded-2xl object-cover md:w-48" />
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="font-script text-3xl text-primary md:text-4xl">{x.apercu}</h2>
            <p className="mt-2 text-muted-foreground">{x.apercuSub}</p>
          </div>
        </div>
      </section>

      <RecipeDetails lang={lang} />

      <footer className="wave-top bg-cocoa pb-8 pt-20 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Délices Maison" loading="lazy" className="h-20 w-20 rounded-full ring-4 ring-cream" />
            <div><p className="font-script text-3xl">Délices Maison</p><p className="font-script text-sm text-sun">{x.motto}</p></div>
          </div>
          <Button asChild className="h-auto rounded-full bg-sun px-6 py-3 font-extrabold text-cocoa hover:bg-sun"><a href="#packs">{x.more}</a></Button>
        </div>
        <p className="mt-8 border-t border-cream/20 px-5 pt-6 text-center text-sm opacity-90">© 2026 Délices Maison. {x.rights} · {x.love}</p>
      </footer>
      {best && <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-card px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-soft md:hidden">
        <div className="shrink-0"><p className="text-xs font-extrabold text-primary">60 {t.recipes}{active ? " · −40 %" : ""}</p><p className="text-xl font-extrabold text-primary">{money(packPrice(best.basePrice, best.count, now ?? 0), lang)}</p></div>
        <Button asChild className="h-auto whitespace-normal rounded-full bg-sun px-5 py-3 font-extrabold text-cocoa hover:bg-sun"><a href={best.link[lang]} target="_blank" rel="noopener noreferrer"><ShoppingBag />{lang === "fr" ? "Choisir le pack 60" : "Get the 60 pack"}</a></Button>
      </div>}
    </div>
  );
}
