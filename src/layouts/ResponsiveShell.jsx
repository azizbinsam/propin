import { Outlet } from 'react-router-dom'
import useIsDesktop from '../hooks/useIsDesktop'
import MobileLayout from './MobileLayout'
import DesktopLayout from './DesktopLayout'

export default function ResponsiveShell() {
  const isDesktop = useIsDesktop()
  const Layout = isDesktop ? DesktopLayout : MobileLayout

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}