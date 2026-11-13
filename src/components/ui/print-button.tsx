"use client";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint} className="no-print bg-accent hover:bg-accent/80 rounded-2xl px-4 py-2 text-white">
      Print Meeting
    </button>
  );
}
