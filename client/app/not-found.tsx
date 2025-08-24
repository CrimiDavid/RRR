export default function NotFoundPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-background to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
                {/* CSS-only animated background */}
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 animate-pulse" />

                {/* Pure CSS floating elements */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20" style={{ animation: 'bounce 3s infinite', animationDelay: '0s' }} />
                <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20" style={{ animation: 'bounce 4s infinite', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/5 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20" style={{ animation: 'bounce 3.5s infinite', animationDelay: '2s' }} />
                <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20" style={{ animation: 'bounce 2.8s infinite', animationDelay: '0.5s' }} />
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20" style={{ animation: 'bounce 3.2s infinite', animationDelay: '1.5s' }} />
                <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20" style={{ animation: 'bounce 2.5s infinite', animationDelay: '2.5s' }} />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 z' fill='none' stroke='white' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`
                }} />

                <div className="relative z-10 text-center max-w-2xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out', opacity: 1 }}>
                    {/* 404 Number with CSS-only glow effect */}
                    <div className="relative mb-8">
                        <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-none animate-pulse">
                            404
                        </h1>
                        <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-blue-500 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}>
                            404
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="space-y-6 mb-12">
                        <div className="flex items-center justify-center gap-2 text-blue-400 mb-4">
                            <div className="w-5 h-5 bg-blue-400 animate-pulse" style={{ clipPath: 'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' }} />
                            <span className="text-sm font-medium tracking-wider uppercase">Page Not Found</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ animation: 'fadeInUp 0.8s ease-out', animationDelay: '0.2s', opacity: 1 }}>
                            Oops! Lost in the void
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto" style={{ animation: 'fadeInUp 0.8s ease-out', animationDelay: '0.4s', opacity: 1 }}>
                            The page you're looking for seems to have vanished into the digital ether.
                            Don't worry, even the best explorers sometimes take a wrong turn.
                        </p>
                    </div>



                    {/* Bottom decorative element */}
                    <div className="mt-16 flex justify-center" style={{ animation: 'fadeInUp 0.8s ease-out', animationDelay: '0.8s', opacity: 1 }}>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full opacity-50" />
                    </div>
                </div>

                {/* Subtle corner decorations */}
                <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-purple-500/30 rounded-tl-lg" style={{ animation: 'fadeIn 0.8s ease-out', animationDelay: '1s', opacity: 1 }} />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-blue-500/30 rounded-br-lg" style={{ animation: 'fadeIn 0.8s ease-out', animationDelay: '1.2s', opacity: 1 }} />
            </div>

            {/* Add these CSS animations to your global CSS file */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `
            }} />
        </>
    );
}