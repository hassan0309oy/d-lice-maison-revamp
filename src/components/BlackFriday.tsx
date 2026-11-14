import { ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/config/site";
import { BLACK_FRIDAY_END, countdown, promotionActive } from "@/lib/shop-rules";

export function BlackFriday({ lang, now }: { lang: Lang; now: number | null }) {
  if (now === null || !promotionActive(now)) return null;
  const fr = lang === "fr";
  const [hours, minutes, seconds] = countdown(now);
  const end = new Intl.DateTimeFormat(fr ? "fr-FR" : "en-GB", { timeZone: "Europe/Paris", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }).format(BLACK_FRIDAY_END);
  return <section aria-label="Black Friday" className="bg-promotion text-promotion-foreground">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-5 md:justify-between">
      <div><p className="text-sm font-extrabold uppercase">Black Friday · −40 %</p><p className="mt-1 font-bold">{fr ? "Sur les packs 40 & 60 recettes" : "On the 40 & 60 recipe packs"}</p></div>
      <div className="flex items-center gap-3"><Timer className="size-5" /><div><p className="font-sans text-2xl font-extrabold tabular-nums" role="timer" aria-label={fr ? "Temps restant" : "Time remaining"}>{hours} : {minutes} : {seconds}</p><p className="text-xs">{fr ? "Fin le " : "Ends "}{end} ({fr ? "heure de Paris" : "Paris time"})</p></div></div>
      <Button asChild className="h-auto whitespace-normal bg-sun px-5 py-3 font-extrabold text-cocoa hover:bg-sun"><a href="#packs">{fr ? "J’en profite" : "Shop the offer"}<ArrowRight /></a></Button>
    </div>
  </section>;
}