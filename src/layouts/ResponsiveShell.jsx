import { Outlet } from 'react-router-dom'
import useIsDesktop from '../hooks/useIsDesktop'
import DesktopLayout from '../layouts/DesktopLayout'
import MobileLayout from '../layouts/MobileLayout'
import FloatingAiAssistant from '../components/FloatingAiAssistant'

export default function ResponsiveShell() {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <>
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
        <FloatingAiAssistant />
      </>
    )
  }

  return (
    <>
      <MobileLayout>
        <Outlet />
      </MobileLayout>
      <FloatingAiAssistant />
    </>
  )
}