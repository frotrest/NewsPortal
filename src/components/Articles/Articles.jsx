import React, { useEffect } from 'react';
import styles from './articles.module.css';
import clsx from 'clsx';
import Container from '../../Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/FetchArticles';
import { selectArticles, selectCurrentType } from '../../store/selectors';
import { Link, useLocation } from 'react-router';

const Articles = () => {
  const articles = useSelector(selectArticles) || [];
  const currentType = useSelector(selectCurrentType);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (articles.length === 0 || currentType !== 'top') {
      dispatch(fetchArticles({ category: 'top' }));
    }
  }, [dispatch, articles.length, currentType]);
  return (
    <section className={clsx(styles.articles)}>
      <Container className={clsx(styles.articlesContent)}>
        {articles &&
          articles.map((article) => (
            <Link
              to={`/article/${article.article_id}`}
              state={{ article, from: location.pathname }}
              className={clsx(styles.article)}
              key={article.article_id}
            >
              <img
                src={article.image_url === null ? article.source_icon : article.image_url}
                loading="lazy"
                alt={`articleImg-${article.article_id}`}
                className={clsx(styles.articleImg)}
              />
              <div className={clsx(styles.articleContent)}>
                <h3 className={clsx(styles.articleTitle)}>{article.title}</h3>
                <p className={clsx(styles.articleDescription)}>
                  {article.description || 'Опис відсутній...'}
                </p>
                <button className={clsx(styles.articleBtn)}>Добавити в обрані</button>
              </div>
            </Link>
          ))}
      </Container>
    </section>
  );
};

export default Articles;
