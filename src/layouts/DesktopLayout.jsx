import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function DesktopLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}