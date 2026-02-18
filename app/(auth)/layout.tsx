export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full min-h-screen w-full bg-[url('/images/signup-bg.jpg')]">{children}</main>
  );
}
