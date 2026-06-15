import { Layout, BarChart3, Puzzle } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Layout className="w-8 h-8 text-indigo-600" />,
      title: "Custom Profile Builder",
      description: "Design your profile with infinite customization. Choose from 3D button styles, custom themes, and beautiful typography."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-fuchsia-600" />,
      title: "Advanced Analytics",
      description: "Understand your audience with deep insights. Track clicks, geographic data, referrers, and conversion rates in real-time."
    },
    {
      icon: <Puzzle className="w-8 h-8 text-emerald-600" />,
      title: "50+ Integrations",
      description: "Connect your favorite tools effortlessly. Embed YouTube videos, Spotify tracks, forms, and shopping links directly."
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to grow</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Powerful features designed to help creators and businesses maximize their audience.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 shadow-sm">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 ring-1 ring-slate-200/50">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
