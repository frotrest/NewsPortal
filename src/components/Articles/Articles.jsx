import React, { useEffect } from 'react';
import styles from './articles.module.css';
import clsx from 'clsx';
import Container from '../../Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/fetchArticles';
import { selectArticles, selectCurrentType, selectFavorites } from '../../store/selectors';
import { Link, useLocation } from 'react-router';
import { addFavorite, removeFavorite } from '../../store/favoritesSlice';

const Articles = () => {
  const articles = useSelector(selectArticles) || [];
  const favorites = useSelector(selectFavorites) || [];
  const currentType = useSelector(selectCurrentType);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (currentType !== 'top' || articles.length === 0) {
      dispatch(fetchArticles({ category: 'top' }));
    }
  }, [dispatch, articles.length, currentType]);
  return (
    <section className={clsx(styles.articles)}>
      <Container className={clsx(styles.articlesContent)}>
        {articles &&
          articles.map((article) => {
            const isFav = favorites.some((fav) => fav.article_id === article.article_id);
            return (
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
                  <button
                    className={clsx(styles.articleBtn, isFav && styles.articleBtnFav)}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isFav) {
                        dispatch(removeFavorite(article));
                      } else {
                        dispatch(addFavorite(article));
                      }
                    }}
                  >
                    {isFav ? 'Видалити з обраних' : 'Добавити в обрані'}
                  </button>
                </div>
              </Link>
            );
          })}
      </Container>
    </section>
  );
};

export default Articles;
