import { Footer } from 'common/Footer';
import { Header } from 'common/Header';

import { Features } from './Features';
import { Hero } from './Hero';

export const Home = () => {
  minHeight: "100vh";
  gridRows: "auto 1fr auto";

  content: {
    gridRows: "1fr auto";
  }

  <this>
    <Header />
    <content>
      <Hero />
      <Features />
    </content>
    <Footer />
  </this>
}

