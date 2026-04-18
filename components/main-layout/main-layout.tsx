export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen overflow-y-auto py-6 sm:py-8 px-6 sm:px-8 flex-col bg-background">
      {children}
    </main>
  )
}
