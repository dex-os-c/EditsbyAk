import { useCallback, useMemo, useState } from 'react'
import { ModalContext } from './modalStore'

// Shared so both the portfolio grid and the contact section's business-card
// preview can open the same lightbox/video modal without prop-drilling it
// through every section between them.
export function ModalProvider({ children }) {
  const [project, setProject] = useState(null)

  const openModal = useCallback((p) => setProject(p), [])
  const closeModal = useCallback(() => setProject(null), [])

  const value = useMemo(() => ({ project, openModal, closeModal }), [project, openModal, closeModal])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
