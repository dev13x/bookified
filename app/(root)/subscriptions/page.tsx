import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserPlan } from "@/lib/subscription.server";
import { PLANS, PLAN_LIMITS } from "@/lib/subscription-constants";

export default async function SubscriptionsPage() {
  const currentPlan = await getUserPlan();

  const plansList = [
    {
      id: PLANS.FREE,
      name: "Free",
      price: "$0",
      description: "Ideal for trying out Bookified and testing book conversations.",
      limits: PLAN_LIMITS[PLANS.FREE],
      features: [
        "1 PDF Book library limit",
        "5 Voice sessions per month",
        "5 minutes maximum per session",
        "Basic reading companion voice",
      ],
      cta: "Current Plan",
      popular: false,
    },
    {
      id: PLANS.STANDARD,
      name: "Standard",
      price: "$9",
      period: "/month",
      description: "Perfect for avid readers who want deeper interactions.",
      limits: PLAN_LIMITS[PLANS.STANDARD],
      features: [
        "10 PDF Books library limit",
        "100 Voice sessions per month",
        "15 minutes maximum per session",
        "Auto-saved session transcripts & history",
        "Access to advanced ElevenLabs personas",
        "Priority AI voice synthesis latency",
      ],
      cta: "Upgrade to Standard",
      popular: true,
    },
    {
      id: PLANS.PRO,
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Ultimate conversational package for research and study.",
      limits: PLAN_LIMITS[PLANS.PRO],
      features: [
        "100 PDF Books library limit",
        "Unlimited Voice sessions",
        "60 minutes maximum per session",
        "Auto-saved session transcripts & history",
        "Access to all ElevenLabs voice personas",
        "Lowest latency streaming calls",
        "24/7 dedicated support priority",
      ],
      cta: "Upgrade to Pro",
      popular: false,
    },
  ];

  return (
    <div className="container wrapper py-16 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="size-3.5" />
          <span>Flexible Plans for Everyone</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-foreground">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Upgrade to unlock more books, longer sessions, and advanced voice companion capabilities.
        </p>

        {/* Development Mode Alert */}
        <div className="mt-6 max-w-3xl p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg text-sm text-left flex flex-col space-y-1">
          <span className="font-semibold">⚠️ Developer Info (Clerk Billing Dashboard):</span>
          <span>
            Clerk's native <code>&lt;PricingTable /&gt;</code> is currently disabled because billing has not been configured in your Clerk Dashboard yet. This custom UI displays your application plans so you can continue building and testing without crashes.
          </span>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plansList.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-card border-primary shadow-lg ring-1 ring-primary scale-[1.02] md:scale-[1.03]"
                  : "bg-card/50 hover:bg-card border-border hover:border-muted-foreground/30 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  Most Popular
                </span>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold font-serif text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 min-h-10">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline mt-4">
                    <span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1 text-sm">{plan.period}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-border/60 my-6"></div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Button
                  className={`w-full py-6 text-sm font-semibold tracking-wide rounded-xl shadow-xs transition-all duration-200 ${
                    isCurrent
                      ? "bg-muted text-muted-foreground hover:bg-muted cursor-default border"
                      : plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/95"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? "Current Plan" : plan.cta}
                </Button>
                {!isCurrent && (
                  <p className="text-[11px] text-center text-muted-foreground mt-2">
                    In production, this integrates with Stripe checkout
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
