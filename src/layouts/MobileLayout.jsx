import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function MobileLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}