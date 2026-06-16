import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900 via-black to-black opacity-80"></div>
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-stone-300 text-sm font-bold mb-6 ring-1 ring-white/10">
            <Sparkles className="w-4 h-4 text-[#FF5E62]" />
            ChipNG - Premium Link-in-Bio
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Your Digital World,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E62] to-[#FF9966]">
              in One Stunning Link
            </span>
          </h1>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build a fast, premium bio link tailored for modern creators and businesses. Consolidate your links, unlock pro analytics, and verify your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-[#FF5E62] to-[#FF9966] text-white rounded-full font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[#FF5E62]/20">
              Claim Your Free Link <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-stone-900 text-white ring-1 ring-white/10 rounded-full font-bold hover:bg-stone-800 transition-colors shadow-sm">
              View Examples
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
