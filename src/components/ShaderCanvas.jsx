import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Vertex shader por defecto (plano completo)
const defaultVertex = `
  varying vec2 vtexCoord;
  void main() {
    vtexCoord = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function ShaderPlane({ vertexShader = defaultVertex, fragmentShader }) {
  const materialRef = useRef();

  // Uniforms estándar que puedes usar en todos tus apuntes
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  // Actualiza el tiempo en cada frame
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderCanvas({ vertexShader, fragmentShader, height = '350px' })
{
    const [activeShader, setActiveShader] = useState('fragment');

    return (
        <div className="shader-window">
            <div className="shader-window_toolbar">
                <text className="proto-style">INTERACTIVE 3D WIDGET</text>
                <span className="proto-style">↔ Arrastra para rotar</span>
            </div>

            <div className="shader-window_body" style={{ '--shader-height': height }}>
                <div className="shader-window_viewport" style={{ height }}>
                    <Canvas camera={{ position: [0, 0, 2.2] }}>
                        <ShaderPlane vertexShader={vertexShader} fragmentShader={fragmentShader} />
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </div>
                
                <aside className="shader-code-panel">
                    <div className="shader-code-tabs" role="tablist" aria-label="Shaders GLSL">
                        <button type="button" role="tab" aria-selected={activeShader === 'vertex'} onClick={() => setActiveShader('vertex')}>
                            Vertex
                        </button>

                        <button type="button" role="tab" aria-selected={activeShader === 'fragment'} onClick={() => setActiveShader('fragment')}>
                            Fragment
                        </button>
                    </div>

                    <pre className="shader-code">
                        <code>
                            {activeShader === 'vertex' ? vertexShader : fragmentShader}
                        </code>
                    </pre>
                </aside>
            </div>
        </div>
    );
}