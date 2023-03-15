import { ReactNode, useState } from 'react';

// types
import { GhStats } from '@/utils/backend/getGhStats';

// mantine
import { useMediaQuery } from '@mantine/hooks';

// styles
import classes from './ghDisplay.module.scss';

// icons
import { IoPeople, IoStar, IoOpen } from 'react-icons/io5';
import { GoRepo, GoGitCommit } from 'react-icons/go';

// utils
import getLangColor from '@/utils/frontend/getLangColor';

// components
import Button from '../button';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';

const MotionArticle = ({
  children,
  opacity,
  ...props
}: {
  opacity: number;
  className: string;
  key: string | number;
  children: ReactNode;
}) => (
  <motion.article
    {...props}
    animate={{ opacity: opacity }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}>
    {children}
  </motion.article>
);

const formatNumbers = (num: number) => {
  const intl = new Intl.NumberFormat('de-DE');
  return intl.format(num);
};

interface Props {
  ghData: GhStats;
}

const GhDisplay = ({ ghData }: Props) => {
  const { followers, following, rawData, total, totalRepos } = ghData;
  const [itemCount, setItemCount] = useState(4);
  const isMobile = useMediaQuery('(max-width: 966px)');

  return (
    <section className={classes.ghDisplay}>
      <header className={classes.header}>
        <h4 className={classes.title}>
          <SiGithub />
          <span>My Github stats</span>
        </h4>
        <div className={classes.socialStats}>
          <div className={classes.socialStatsItem}>
            <GoGitCommit />
            <p>
              <span>{`Public Commits: `}</span>
              <a>{formatNumbers(total)}</a>
            </p>
          </div>
          <div className={classes.socialStatsItem}>
            <GoRepo />
            <p>
              <span>{`Public Repos: `}</span>
              <a>{formatNumbers(totalRepos)}</a>
            </p>
          </div>
          <div className={classes.socialStatsItem}>
            <IoPeople />
            <p>
              <span>{`Followers: `}</span>
              <a
                href='https://github.com/amir4rab?tab=followers'
                target='_blank'
                rel='noreferrer'>
                {formatNumbers(followers)}
              </a>
              <span>{`, Followings: `}</span>
              <a
                href='https://github.com/amir4rab?tab=following'
                target='_blank'
                rel='noreferrer'>
                {formatNumbers(following)}
              </a>
            </p>
          </div>
        </div>
      </header>
      <div className={classes.cardWrapper}>
        <AnimatePresence>
          {(() => (
            <>
              {rawData.repos
                .slice(0, itemCount)
                .map(
                  ({
                    id,
                    name,
                    description,
                    stargazers_count,
                    language,
                    html_url
                  }) => (
                    <MotionArticle
                      opacity={isMobile ? 1 : 0.75}
                      className={classes.card}
                      key={id}>
                      <h5 className={classes.cardTitle}>{name}</h5>
                      <p className={classes.cardDescription}>{description}</p>
                      <footer className={classes.cardFooter}>
                        {language && (
                          <div className={classes.langColorWrapper}>
                            <div
                              className={classes.langColor}
                              style={{ background: getLangColor(language) }}
                            />
                            <p>{language}</p>
                          </div>
                        )}
                        <div className={classes.starsWrapper}>
                          <p>{stargazers_count}</p>
                          <IoStar />
                        </div>
                        <a
                          target='_blank'
                          rel='noreferrer'
                          className={classes.openRepo}
                          href={html_url}>
                          <IoOpen />
                        </a>
                      </footer>
                    </MotionArticle>
                  )
                )}
              {rawData.repos.length > itemCount && (
                <MotionArticle
                  opacity={isMobile ? 1 : 0.75}
                  className={classes.card}
                  key={`ghDisplay-show-more-${itemCount}`}>
                  <h5 className={classes.cardTitle}>Show more</h5>
                  <p className={classes.cardDescription}>want to see more?</p>
                  <footer
                    className={classes.cardFooter}
                    style={{ justifyContent: 'flex-end' }}>
                    <Button
                      onClick={() => setItemCount((curr) => curr + 4)}
                      style={{
                        fontSize: 'var(--font-xs)'
                      }}>
                      Click here
                    </Button>
                  </footer>
                </MotionArticle>
              )}
            </>
          ))()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GhDisplay;
