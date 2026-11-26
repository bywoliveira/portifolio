// Injeta o HTML pré-renderizado do React em dist/index.html.
// Executado automaticamente por `npm run build` depois dos builds de cliente e de servidor.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')
const indexFile = resolve(root, 'dist/index.html')

const { render } = await import(pathToFileURL(ssrEntry).href)
const html = readFileSync(indexFile, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('Marcador <div id="root"></div> não encontrado em dist/index.html')

writeFileSync(indexFile, html.replace(marker, `<div id="root">${render()}</div>`))
rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log('✓ HTML pré-renderizado em dist/index.html')
