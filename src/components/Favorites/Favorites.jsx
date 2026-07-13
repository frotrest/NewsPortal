import React from 'react';
import styles from './favorites.module.css';
import clsx from 'clsx';
import Container from '../../Container';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites } from '../../store/selectors';
import { removeFavorite } from '../../store/favoritesSlice';
import { Link, useLocation } from 'react-router';

const Favorites = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const favorites = useSelector(selectFavorites) || [];

  if (favorites.length === 0) {
    return (
      <section className={clsx(styles.favorites)}>
        <Container className={clsx(styles.favoritesContent)}>
          <p className={styles.noResults}>У вас ще немає обраних новин.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className={clsx(styles.favorites)}>
      <Container className={clsx(styles.favoritesContent)}>
        {favorites.map((article) => (
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
                className={clsx(styles.articleBtn)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(removeFavorite(article));
                }}
              >
                Видалити з обраних
              </button>
            </div>
          </Link>
        ))}
      </Container>
    </section>
  );
};

export default Favorites;
