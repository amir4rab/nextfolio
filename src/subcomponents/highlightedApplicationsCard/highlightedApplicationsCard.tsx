import { useState } from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// components
import Button from '../button';
import Link from 'next/link';

// types
import type { ShowcaseProjectFrontmatter } from '@/types/markdownFrontmatter';

// styles
import classes from './highlightedApplicationsCard.module.scss';

const colorScheme = 'dark';

const InnerCard = ({
  application
}: {
  application: ShowcaseProjectFrontmatter;
}) => {
  const { id, name, shortInfo, images, background } = application;
  const { banner } = images;
  const { muted, colorful } = background;

  return (
    <>
      <motion.div
        className={classes.cardContent}
        initial={{ left: 100, opacity: 0, zIndex: 5 }}
        animate={{ left: [100, 50, 0], opacity: [0, 0, 1], zIndex: 5 }}
        exit={{ left: [0, -50, -100], opacity: [1, 0, 0], zIndex: 5 }}
        key={id}>
        <div className={classes.cardDetails}>
          <p className={classes.cardTitle}>{name}</p>
          <p>{shortInfo}</p>
          <Link href={`/showcase/${id}`}>
            <Button style={{ fontSize: 'var(--text-xs)' }}>Read more</Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className={classes.cardBackground}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: colorScheme === 'dark' ? muted : colorful }}
        key={id + '-banner'}>
        <img
          className={classes.cardBanner}
          src={banner.url}
          style={{ aspectRatio: banner.aspectRatio }}
          loading='lazy'
          alt={name + ' banner'}
        />
      </motion.div>
    </>
  );
};

interface Props {
  applications: ShowcaseProjectFrontmatter[];
}

const HighlightedApplicationsCard = ({ applications }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classes.highlightedApplicationsCard}>
      <div className={classes.side}>
        <h3 id='showcase'>Some of my highlighted projects</h3>
        <div className={classes.controls}>
          {applications.map(({ images, id, name }, i) => (
            <button
              onClick={() => setActiveIndex(i)}
              data-active={i === activeIndex ? true : undefined}
              key={id}>
              <img src={images.icon} alt={name + ' icon'} />
            </button>
          ))}
        </div>
      </div>
      <div className={classes.card}>
        <AnimatePresence initial={true}>
          <InnerCard
            application={applications[activeIndex]}
            key={activeIndex}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HighlightedApplicationsCard;
