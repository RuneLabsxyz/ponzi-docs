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
      alignItems: 'flex-end'
    }}>
      <div className="container" style={{ marginBottom: '18vh' }}>
        <p className={clsx("hero__subtitle", styles.customFont)} style={{fontSize: '2rem', color: 'white'}}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--secondary button--lg", styles.customFont)}
            to="/docs/intro">
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
