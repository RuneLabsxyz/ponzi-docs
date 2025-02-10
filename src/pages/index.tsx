import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)} style={{
      backgroundImage: `url('/img/hero.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '93vh',
      display: 'flex',
      alignItems: 'flex-end',
      imageRendering: 'pixelated'
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(80vw, 600px)',
        height: 'auto',
        imageRendering: 'pixelated'
      }}>
        <img src="/img/ponziland.png" alt="Ponzi Land Logo" style={{
          width: '100%',
          height: 'auto'
        }} />
      </div>
      <div className={clsx("container", styles.container)}>
        <p className={clsx("hero__subtitle", styles.customFont, styles.heroSubtitle)} style={{
          fontSize: 'clamp(1rem, 4vw, 1.5rem)'
        }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(styles.customFont, styles.ctaButton)}
            to="/docs/intro"
            style={{
              fontSize: 'clamp(0.8rem, 3vw, 1.2rem)'
            }}>
            Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Ponzi Land`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
      </main>
    </Layout>
  );
}
