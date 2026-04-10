export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full min-h-screen w-full">{children}</main>
  );
}
