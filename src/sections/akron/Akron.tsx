import { useState } from 'react'
import { akron } from '../../data/akron'
import { VideoDialog } from '../../components/VideoDialog'
import { AkronCover } from './AkronCover'
import { AkronProblem } from './AkronProblem'
import { AkronPipeline } from './AkronPipeline'
import { AkronWeb } from './AkronWeb'
import { AkronApp } from './AkronApp'
import { AkronTech } from './AkronTech'
import { AkronRole } from './AkronRole'

/**
 * Estudo de caso do Ákron. Usa a identidade visual do próprio projeto (logo, azul-ardósia,
 * fundos #F1F4F8 / #0D1218), diferente da identidade do portfólio, de propósito.
 */
export function Akron() {
  const [video, setVideo] = useState(false)
  return (
    <section id="akron" className="akron" aria-labelledby="akron-titulo">
      <AkronCover onPlay={() => setVideo(true)} />
      <AkronProblem />
      <AkronPipeline />
      <AkronWeb />
      <AkronApp />
      <AkronTech />
      <AkronRole />
      <VideoDialog open={video} onClose={() => setVideo(false)} {...akron.video} />
    </section>
  )
}
