import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₦0",
      interval: "/month",
      description: "Everything you need to start.",
      features: ["Basic profile builder", "Standard links", "Default CHIP NG theme", "Basic analytics"],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "₦3,500",
      interval: "/month",
      billingNote: "or ₦35,000 / year",
      description: "For creators ready to scale.",
      features: ["Verified badge", "Advanced analytics", "Priority links & 3D styling", "Remove CHIP NG branding", "All Free features"],
      buttonText: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "₦10,000",
      interval: "/month",
      description: "For agencies and businesses.",
      features: ["Multiple profiles", "Custom domains (yourname.com)", "Premium 24/7 support", "Custom integrations", "All Pro features"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Choose the perfect plan for your brand size and goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl bg-white border flex flex-col ${plan.popular ? 'border-indigo-500 shadow-2xl shadow-indigo-100 ring-1 ring-indigo-500' : 'border-slate-200 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-md">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 mb-6 font-medium h-6">{plan.description}</p>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-lg text-slate-500 font-medium">{plan.interval}</span>
                </div>
                {plan.billingNote && (
                  <div className="text-sm text-indigo-600 font-bold mt-2 bg-indigo-50 inline-block px-2 py-1 rounded-md">{plan.billingNote}</div>
                )}
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-sm ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
