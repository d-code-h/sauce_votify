import { useState } from 'react';
import { Roboto } from '@next/font/google';
import '../styles/globals.css';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});
export default function App({ Component, pageProps }) {
  const [matric, setMatric] = useState('');

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} matric={matric} setMatric={setMatric} />
    </>
  );
}
