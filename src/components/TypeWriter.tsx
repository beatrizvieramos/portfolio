import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Digita o texto quando entra na tela; `hi` é o trecho destacado em rosa. */
export function TypeWriter({ text, hi, className = 'big' }: { text: string; hi?: string; className?: string }) {
  const [ref, seen] = useInView<HTMLHeadingElement>(0.25);
  const [n, setN] = useState(reduce ? text.length : 0);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    if (!seen || reduce) return;
    setCursor(true);
    let i = 0;
    let t = 0;
    const tick = () => {
      setN(++i);
      if (i < text.length) t = window.setTimeout(tick, 70);
      else t = window.setTimeout(() => setCursor(false), 1800);
    };
    t = window.setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [seen, text]);

  const s = text.slice(0, n);
  const i = hi ? text.indexOf(hi) : -1;
  const body = i >= 0 && n > i ? <>{s.slice(0, i)}<span className="p">{s.slice(i)}</span></> : s;
  return <h2 ref={ref} className={`${className}${cursor ? ' type-cur' : ''}${seen ? ' in' : ''}`} aria-label={text}>{body || ' '}</h2>;
}
