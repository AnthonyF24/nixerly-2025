import Navbar from '@/components/ui/navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </>
  );
} 