import * as esbuild from 'esbuild-wasm'
import { render } from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { unpkgPathPlugin} from './plugins/unpkg-path-plugin'

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // initialize esbuild service and assign to ref
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    });

  }

  useEffect(() => {
    startService();
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })

    setCode(result.outputFiles[0].text)
  }

  return  (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
    <pre>{code}</pre>
    </div>
  )
}

render(
  <App />, 
  document.getElementById('root')
)