"use client";

import { useEffect, useRef, useState } from "react";

interface RippleImageProps {
  src: string;
  alt: string;
  /** Applied to the wrapper (and inherited visually by the canvas) so all the
   *  existing grayscale / scale / transition classes keep working. */
  className?: string;
}

const MAX_RIPPLES = 40;
const LIFETIME = 1.5; // seconds a ripple stays alive

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uImage;
uniform vec2 uRes;       // canvas pixel size
uniform vec2 uImgRes;    // image natural size
uniform float uTime;     // seconds
uniform int uCount;      // active ripples
uniform vec4 uRipples[${MAX_RIPPLES}]; // xy = uv pos, z = start time, w = strength

void main() {
  float aspect = uRes.x / uRes.y;

  // object-cover mapping
  vec2 ratio = vec2(
    min((uRes.x / uRes.y) / (uImgRes.x / uImgRes.y), 1.0),
    min((uRes.y / uRes.x) / (uImgRes.y / uImgRes.x), 1.0)
  );
  vec2 coverUv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  float height = 0.0;
  vec2 grad = vec2(0.0);

  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    if (i >= uCount) break;
    vec4 r = uRipples[i];
    float age = uTime - r.z;
    if (age < 0.0) continue;

    // distance in screen-proportional units (so rings stay circular)
    vec2 d = (vUv - r.xy) * vec2(aspect, 1.0);
    float dist = length(d);

    float ringRadius = age * 0.32;                 // expansion speed
    float decay = exp(-age * 3.2);                 // fade over time
    float ring = exp(-pow((dist - ringRadius) / 0.05, 2.0)); // gaussian ring
    float osc = sin((dist - ringRadius) * 60.0 - age * 7.0);

    float h = r.w * decay * ring * osc;
    height += h;
    grad += normalize(d + 1e-4) * h;
  }

  float displaceScale = 0.028;
  vec2 uv = coverUv + grad * displaceScale;

  vec3 color = texture2D(uImage, uv).rgb;

  // watery sheen: brighten crests, darken troughs slightly
  color += vec3(height * 0.45);

  gl_FragColor = vec4(color, 1.0);
}
`;

function createProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export default function RippleImage({ src, alt, className }: RippleImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setFallback(true);
      return;
    }

    const gl =
      (canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext(
        "experimental-webgl",
      ) as WebGLRenderingContext | null);

    if (!gl) {
      setFallback(true);
      return;
    }

    const program = createProgram(gl);
    if (!program) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uImage = gl.getUniformLocation(program, "uImage");
    const uRes = gl.getUniformLocation(program, "uRes");
    const uImgRes = gl.getUniformLocation(program, "uImgRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uCount = gl.getUniformLocation(program, "uCount");
    const uRipples = gl.getUniformLocation(program, "uRipples");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let imgW = 1;
    let imgH = 1;
    let imageReady = false;

    // ripple state: flat [x, y, t, strength] * MAX_RIPPLES
    const ripples = new Float32Array(MAX_RIPPLES * 4);
    let count = 0;
    const start = performance.now();
    let raf = 0;
    let running = false;
    let visible = true;
    let lastPx = 0;
    let lastPy = 0;
    let lastMoveT = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = Math.max(1, Math.round(wrap.clientWidth * dpr()));
      const h = Math.max(1, Math.round(wrap.clientHeight * dpr()));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      if (imageReady) render();
    };

    const render = () => {
      const t = (performance.now() - start) / 1000;

      // prune expired ripples (compact the array)
      let n = 0;
      for (let i = 0; i < count; i++) {
        const age = t - ripples[i * 4 + 2];
        if (age <= LIFETIME) {
          if (n !== i) {
            ripples[n * 4] = ripples[i * 4];
            ripples[n * 4 + 1] = ripples[i * 4 + 1];
            ripples[n * 4 + 2] = ripples[i * 4 + 2];
            ripples[n * 4 + 3] = ripples[i * 4 + 3];
          }
          n++;
        }
      }
      count = n;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uImage, 0);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uImgRes, imgW, imgH);
      gl.uniform1f(uTime, t);
      gl.uniform1i(uCount, count);
      gl.uniform4fv(uRipples, ripples);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      render();
      if (visible && count > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running && visible && imageReady) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const addRipple = (uvx: number, uvy: number, strength: number) => {
      const t = (performance.now() - start) / 1000;
      const idx = count < MAX_RIPPLES ? count : MAX_RIPPLES - 1;
      if (count < MAX_RIPPLES) count++;
      else {
        // drop the oldest by shifting
        ripples.copyWithin(0, 4);
      }
      const i = idx;
      ripples[i * 4] = uvx;
      ripples[i * 4 + 1] = uvy;
      ripples[i * 4 + 2] = t;
      ripples[i * 4 + 3] = strength;
      kick();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX;
      const py = e.clientY;
      if (
        px < rect.left ||
        px > rect.right ||
        py < rect.top ||
        py > rect.bottom
      ) {
        return;
      }
      const now = performance.now();
      const uvx = (px - rect.left) / rect.width;
      const uvy = 1.0 - (py - rect.top) / rect.height; // GL origin bottom-left

      // gate by minimum movement so we don't flood
      const moved = Math.hypot(px - lastPx, py - lastPy);
      if (moved < 6 && now - lastMoveT < 40) return;

      const dt = Math.max(now - lastMoveT, 1);
      const speed = Math.min(moved / dt, 3); // px per ms, clamped
      const strength = 0.4 + Math.min(speed, 1) * 0.6;

      lastPx = px;
      lastPy = py;
      lastMoveT = now;
      addRipple(uvx, uvy, strength);
    };

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      imgW = img.naturalWidth || 1;
      imgH = img.naturalHeight || 1;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img,
      );
      imageReady = true;
      resize();
      render(); // initial still frame
    };
    img.onerror = () => setFallback(true);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) kick();
      },
      { rootMargin: "100px" },
    );
    io.observe(wrap);

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      io.disconnect();
      const lose = gl.getExtension("WEBGL_lose_context");
      lose?.loseContext();
    };
  }, [src]);

  if (fallback) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div ref={wrapRef} className={className} role="img" aria-label={alt}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
