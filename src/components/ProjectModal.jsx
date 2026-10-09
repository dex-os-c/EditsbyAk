import { useEffect, useRef } from 'react'
import { useModal } from '../lib/modalStore'
import { onImgError } from '../lib/media'
import Icon from './Icon.jsx'
import './ProjectModal.css'

export default function ProjectModal() {
  const { project, closeModal } = useModal()
  const videoRef = useRef(null)
  const open = Boolean(project)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  return (
    <div
      className={`modal${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
      aria-hidden={!open}
    >
      {project && (
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal} aria-label="Close">&times;</button>
          <div className="modal-video-wrap">
            {project.video ? (
              <video ref={videoRef} src={project.video} controls playsInline preload="metadata" />
            ) : (
              <>
                <img
                  src={project.thumb}
                  onError={onImgError(project.thumbFallback || '/assets/placeholder-project.svg')}
                  alt={project.title}
                />
                <div className="modal-play-badge">
                  <div className="showcase-play" style={{ width: 64, height: 64 }}>
                    <Icon name="play" size={24} />
                  </div>
                  <span>Add your project video URL to enable playback</span>
                </div>
              </>
            )}
          </div>
          <div className="modal-info">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}
