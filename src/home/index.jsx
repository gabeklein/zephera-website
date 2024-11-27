import { Footer } from 'common/Footer';
import { Header } from 'common/Header';

import { Features } from './Features';
import { Hero } from './Hero';
import { AnimateBG } from 'common/AnimateBG';

export const Home = () => {
  const { element } = AnimateBG.use();

  minHeight: "100vh";
  gridRows: "auto 1fr auto";

  content: {
    position: relative;
    gridRows: "1fr auto";
  }

  canvas: {
    absolute: fill;
  }

  <this>
    <Header />
    <content ref={element}>
      <Hero />
      <Features />
    </content>
    <Footer />
  </this>
}

