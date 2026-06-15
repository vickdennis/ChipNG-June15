export default function Navbar({ onAuth }: { onAuth?: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="text-2xl font-black tracking-tight text-slate-900">
          CHIP NG
        </a>
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onAuth} className="hidden md:block font-bold text-slate-900 hover:text-indigo-600 transition-colors">Log In</button>
          <button onClick={onAuth} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-sm">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
