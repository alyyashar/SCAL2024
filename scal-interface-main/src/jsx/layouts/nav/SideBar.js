import React, { useContext, useEffect } from 'react';
import Metismenu from 'metismenujs';
import { Link } from 'react-router-dom';
import useScrollPosition from 'use-scroll-position';
import { ThemeContext } from '../../../context/ThemeContext';

const Sidebar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } = useContext(ThemeContext);
  const scrollPosition = useScrollPosition();

  useEffect(() => {
    const btn = document.querySelector('.nav-control');
    const mainWrapper = document.querySelector('#main-wrapper');

    const toggleFunc = () => {
      mainWrapper.classList.toggle('menu-toggle');
    };

    btn.addEventListener('click', toggleFunc);

    return () => {
      btn.removeEventListener('click', toggleFunc);
    };
  }, []);

  useEffect(() => {
    const el = document.querySelector('.metismenu');
    new Metismenu(el);
  }, []);

  let path = window.location.pathname.split('/').pop();

  const menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: 'flaticon-025-dashboard' },
    { path: 'solidity-scan', label: 'Scan Solidity', icon: 'flaticon-381-file' },
    { path: 'scan-history', label: 'Scan History', icon: 'flaticon-088-time' },
    { path: 'tools', label: 'Tools', icon: 'flaticon-381-settings-3' },
    { path: 'about', label: 'About', icon: 'flaticon-050-info' },
    { path: 'liveguard', label: 'LiveGuard', icon: 'flaticon-381-shield' }, // Add LiveGuard to menu
  ];

  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === 'fixed' &&
        sidebarLayout.value === 'horizontal' &&
        headerposition.value === 'static' &&
        scrollPosition > 120
          ? 'fixed'
          : ''
      }`}
    >
      <div className="mm-wrapper">
        <ul className="metismenu">
          {menuItems.map((item) => (
            <li key={item.path} className={path === item.path ? 'mm-active' : ''}>
              <Link className="ai-icon" to={item.path}>
                <i className={item.icon}></i>
                <span className="nav-text">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
