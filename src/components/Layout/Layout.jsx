import React from 'react';
import styles from './layout.module.css';
import clsx from 'clsx';
import { NavLink, Outlet } from 'react-router';
import Container from '../../Container';
import { Suspense } from 'react';

const Layout = () => {
  const navBar = [
    {
      link: '/',
      title: 'Головна сторінка',
    },
    {
      link: '/searchArticles',
      title: 'Шукати новини',
    },
    {
      link: '/favorites',
      title: 'Обрані новини',
    },
  ];
  return (
    <div className={styles.appWrapper}>
      <header className={clsx(styles.header)}>
        <Container className={clsx(styles.headerContent)}>
          <nav className={clsx(styles.navBar)}>
            {navBar.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? clsx(styles.navBarItem, styles.navBarItemActive)
                    : clsx(styles.navBarItem)
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </Container>
      </header>
      <main className={clsx(styles.main)}>
        <Suspense
          fallback={
            <div className="loadingContainer">
              <h1 className="loadingTitle">Завантаження</h1>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer className={clsx(styles.footer)}>
        <Container className={clsx(styles.footerContent)}>
          <p className={clsx(styles.copy)}>
            &copy; {new Date().getFullYear()} News Portal. Всі права захищені.
          </p>
          <div className={clsx(styles.footerLinks)}>
            <a
              href="https://github.com/frotrest/news"
              target="_blank"
              className={clsx(styles.footerLink)}
            >
              GitHub
            </a>
            <a href="#" className={clsx(styles.footerLink)}>
              Контакти
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
