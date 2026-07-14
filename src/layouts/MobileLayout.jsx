import BottomNav from '../components/BottomNav'

export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      <main>{children}</main>
      <BottomNav />
    </div>
  )
}