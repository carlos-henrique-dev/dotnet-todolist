type Props = {
  children: React.ReactNode
}

export const PageContainer = ({ children }: Props) => (
  <main className="h-screen w-screen flex flex-col items-center justify-start bg-gray-100 p-10 ">
    <section className="h-full w-1/2">{children}</section>
  </main>
)
