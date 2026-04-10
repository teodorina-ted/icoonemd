const FloatingWhatsApp = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form-anchor")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToForm}
      title="Contact"
      className="fixed bottom-4 right-4 md:bottom-7 md:right-7 w-[52px] h-[52px] md:w-[58px] md:h-[58px] rounded-full flex items-center justify-center z-[999] shadow-xl hover:scale-110 transition-transform border-none cursor-pointer bg-pink-deep"
      style={{ boxShadow: "0 6px 24px rgba(131,39,52,0.4)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-[30px] md:h-[30px]">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    </button>
  );
};

export default FloatingWhatsApp;
