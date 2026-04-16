export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-6 sm:py-16 px-6 sm:px-16 bg-background sm:items-start">{children}</main>
    </div>
  )
}