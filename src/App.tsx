import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { Missions } from './pages/Missions'
import { Play } from './pages/Play'
import { Profile } from './pages/Profile'
import { SecretPortal } from './pages/SecretPortal'
import { SecretUfo } from './pages/SecretUfo'
import { WorldDetail } from './pages/WorldDetail'
import { Worlds } from './pages/Worlds'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/mundos" element={<Worlds />} />
        <Route path="/mundos/:worldId" element={<WorldDetail />} />
        <Route path="/jugar/:worldId/:levelId" element={<Play />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/misiones" element={<Missions />} />
        <Route path="/secreto/ovni" element={<SecretUfo />} />
        <Route path="/secreto/portal" element={<SecretPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
