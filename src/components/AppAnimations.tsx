export function AppAnimations() {
    return (
        <style>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-in { animation-duration: 0.5s; animation-fill-mode: both; }
        .fade-in { animation-name: fadeIn; }
        .slide-in-from-bottom-4 { animation-name: slideInFromBottom4; }
        .slide-in-from-bottom-8 { animation-name: slideInFromBottom8; }
        .slide-in-from-right-8 { animation-name: slideInFromRight8; }
        .slide-in-from-right-full { animation-name: slideInFromRightFull; }
        .slide-in-from-bottom-5 { animation-name: slideInFromBottom5; }
        .zoom-in-95 { animation-name: zoomIn95; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInFromBottom4 { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInFromBottom8 { from { transform: translateY(2rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInFromBottom5 { from { transform: translateY(1.25rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInFromRight8 { from { transform: translateX(2rem); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInFromRightFull { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes zoomIn95 { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    );
}
