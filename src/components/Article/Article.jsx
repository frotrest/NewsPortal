import React from 'react';
import styles from './article.module.css';
import clsx from 'clsx';
import { useLocation, useParams } from 'react-router';
import Container from '../../Container.jsx';
import { useSelector } from 'react-redux';
import { selectArticleById } from '../../store/selectors.js';
import { Link } from 'react-router';

const Article = () => {
  const { id } = useParams();
  const location = useLocation();
  const articleFromRedux = useSelector((state) => selectArticleById(state, id));
  const article = location.state.article || articleFromRedux;

  const backLinkHref = location.state.from ?? '/';

  if (!article) {
    return (
      <main className={clsx(styles.articlePage)}>
        <Container className={clsx(styles.articlePageContent)}>
          <p className={styles.errorText}>Новину не знайдено.</p>
          <Link to="/" className={clsx(styles.backBtn)}>
            Повернутися на головну
          </Link>
        </Container>
      </main>
    );
  }
  return (
    <main className={clsx(styles.articlePage)}>
      <Container className={clsx(styles.articlePageContent)}>
        <Link to={backLinkHref} className={clsx(styles.backBtn)}>
          Назад до новин
        </Link>
        <article className={clsx(styles.mainContent)}>
          <div className={clsx(styles.metaTop)}>
            <span className={clsx(styles.source)}>{article.source_id}</span>
            <span className={clsx(styles.date)}>{article.pubDate}</span>
          </div>
          <h1 className={clsx(styles.title)}>{article.title}</h1>
          {article.creator && (
            <p className={clsx(styles.author)}>
              Автор: <span>{article.creator.join(', ')}</span>
            </p>
          )}
          <div className={clsx(styles.imageWrapper)}>
            <img
              src={article.image_url === null ? article.source_icon : article.image_url}
              loading="lazy"
              alt={article.title}
              className={clsx(styles.mainImg)}
            />
          </div>
          <div className={clsx(styles.body)}>
            <p className={clsx(styles.text)}>
              {article.description ||
                article.content ||
                `The text of the article isn't available...`}
            </p>
          </div>
          <div className={clsx(styles.actions)}>
            <a href={article.link} target="_blank" className={clsx(styles.originLink)}>
              Читати оригінал джерела
            </a>
            <button className={clsx(styles.favoriteBtn)}>Додати в обрані</button>
          </div>
        </article>
      </Container>
    </main>
  );
};

export default Article;
