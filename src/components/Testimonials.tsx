import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Tolu",
      role: "Content Creator",
      text: "CHIP NG completely elevated my bio. The 3D buttons look so premium, and the analytic insights are insanely detailed for my brand pitches.",
      image: "https://i.pravatar.cc/150?img=47"
    },
    {
      name: "Chima",
      role: "Fitness Coach",
      text: "Switched to CHIP NG last month. The fact I can accept payments and embed my workout programs in one fast-loading link is incredible.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Amaka",
      role: "Startup Founder",
      text: "Our business profile has never looked better. The custom domains on the Enterprise plan gave us the exact professional edge we needed.",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Loved by Nigerian Creators</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Join thousands building their brands and businesses on CHIP NG.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 italic text-lg leading-relaxed">"{test.text}"</p>
              <div className="flex items-center gap-4">
                <img src={test.image} alt={test.name} className="w-14 h-14 rounded-full ring-2 ring-indigo-500" />
                <div>
                  <h4 className="font-bold text-lg">{test.name}</h4>
                  <span className="text-sm font-medium text-indigo-400">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
