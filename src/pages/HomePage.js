import Hero from './components/Hero'
import Stats from './components/Stats'
import Photo from './components/Photo'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050614] via-[#0A0B1E] to-[#141B36] text-white">
      <div className="fixed inset-0 bg-repeat [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      <Hero />
      <Stats />
    </main>
  )
}
