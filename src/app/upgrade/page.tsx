import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    description: "For anyone getting started with AI",
    cta: "Get started",
    featured: false,
    features: [
      "Access to basic model",
      "Limited message access",
      "Basic image generation",
      "Web browsing",
    ],
  },
  {
    name: "Plus",
    price: 15000,
    description: "For individuals who use AI frequently",
    cta: "Upgrade to Plus",
    featured: true,
    features: [
      "Everything in Free",
      "Extended model access",
      "File uploads & analysis",
      "Advanced image generation",
      "Custom assistants",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    price: 150000,
    description: "For power users who need maximum capability",
    cta: "Upgrade to Pro",
    featured: false,
    features: [
      "Everything in Plus",
      "Unlimited access",
      "Fastest response times",
      "Advanced voice mode",
      "Early access to new features",
      "Dedicated support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-center mb-2">Simple, transparent pricing</h1>
      <p className="text-center text-muted-foreground mb-10">Choose the plan that works for you</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 flex flex-col gap-4 ${
              plan.featured ? "border-2 border-blue-500" : "border border-border"
            }`}
          >
            {plan.featured && (
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full self-start">
                Most popular
              </span>
            )}

            <div>
              <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
              <p className="text-3xl font-semibold mt-1">
                {plan.price === 0 ? "Free" : `₦${plan.price.toLocaleString()}`}
                {plan.price > 0 && (
                  <span className="text-sm font-normal text-muted-foreground"> / month</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
            </div>

            <button
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                plan.featured
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {plan.cta}
            </button>

            <hr className="border-border" />

            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}