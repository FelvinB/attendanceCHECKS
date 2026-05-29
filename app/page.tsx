import LoginModal from "./components/LoginModal";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f3f56] overflow-hidden">
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl px-6">
        
        {/* Modal */}
        <div className="flex justify-center">
          <div className="w-full max-w-[500px]">
            <LoginModal />
          </div>
        </div>

      </div>
    </main>
  );
}