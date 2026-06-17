import BrandLogo from './BrandLogo';

export default function Navbar({ onAuth }: { onAuth?: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BrandLogo className="w-24 h-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8 font-bold text-stone-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onAuth} className="hidden md:block font-bold text-stone-300 hover:text-white transition-colors">Log In</button>
          <button onClick={onAuth} className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-stone-200 transition-colors shadow-sm">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
