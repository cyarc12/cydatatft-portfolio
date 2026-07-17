/* ============================================
   cydatatft - 个人作品集
   JavaScript 交互逻辑
   ============================================ */

(function () {
  'use strict';

  // === DOM 元素引用 ===
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const revealElements = document.querySelectorAll('.reveal');
  const statNumbers = document.querySelectorAll('.stat-number');
  const statBars = document.querySelectorAll('.stat-bar-fill');
  const featureTabs = document.querySelectorAll('.feature-tab');
  const featureImage = document.getElementById('featureImage');
  const featureTitle = document.getElementById('featureTitle');
  const featureDesc = document.getElementById('featureDesc');

  // === 功能展示数据 ===
  const featureData = {
    homepage: {
      image: 'assets/screenshot-homepage.jpg',
      title: '应用主页',
      desc: '首页聚合资料检索、阵容推荐、英雄图鉴、装备查询、评级数据和运营速查等核心入口，并支持赛季数据切换，让用户可以从统一入口快速进入不同查询场景。',
      features: [
        '多模块入口统一聚合',
        '赛季数据切换展示',
        '卡片式信息导航',
        '移动端深色界面适配'
      ]
    },
    teamRec: {
      image: 'assets/screenshot-team-rec.jpg',
      title: '阵容推荐',
      desc: '根据版本资料整理多套阵容方案，展示阵容评级、核心角色、羁绊构成、站位信息和装备优先级，支持按强度与类型进行筛选，帮助用户快速理解阵容结构。',
      features: [
        '阵容评级与类型筛选',
        '羁绊构成可视化展示',
        '站位与装备优先级整理',
        '收藏与快速查阅支持'
      ]
    },
    heroDetail: {
      image: 'assets/screenshot-hero-detail.jpg',
      title: '英雄详情',
      desc: '英雄详情页整合角色基础属性、技能说明、羁绊关系、定位信息、推荐装备和相关阵容，将分散资料整理为结构清晰的单角色信息面板。',
      features: [
        '角色属性与技能说明',
        '羁绊和定位信息整合',
        '推荐装备与数据排行',
        '相关阵容联动展示'
      ]
    },
    teamDetail: {
      image: 'assets/screenshot-team-detail.jpg',
      title: '阵容详情',
      desc: '阵容详情页围绕一套完整阵容展开，展示羁绊激活情况、最终英雄、站位图、装备分配、阶段思路和替代选择，强调复杂资料在移动端的层级化展示。',
      features: [
        '羁绊激活与阵容构成',
        '最终英雄与装备分配',
        '站位图移动端展示',
        '运营阶段与替代方案说明'
      ]
    },
    equipTier: {
      image: 'assets/screenshot-equip-tier.jpg',
      title: '装备评级',
      desc: '基于版本资料整理装备强度分层，将常规装备、神器、纹章和光明装备按评级集中展示，并与本地装备资料联动，点击即可查看属性、效果与合成信息。',
      features: [
        '装备强度分层展示',
        '常规装备 / 神器 / 纹章 / 光明装备筛选',
        '装备别名与图标资源匹配',
        '属性、效果与合成路径查询'
      ]
    },
    starGod: {
      image: 'assets/screenshot-star-god.jpg',
      title: '其他信息',
      desc: '更多游戏进阶数据查询，包括星神赐福评级、经济经验表、回合伤害表、符文评级等，将分散的参考数据整合为便捷的查询工具。',
      features: [
        '星神赐福评级查询',
        '经济经验表与利息机制',
        '回合伤害数据参考',
        '符文评级与进阶数据'
      ]
    }
  };

  // === 1. 导航栏滚动效果 ===
  let lastScrollY = 0;

  function handleNavbarScroll() {
    const scrollY = window.scrollY;

    // 滚动时添加背景
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 回到顶部按钮显示
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScrollY = scrollY;
  }

  // === 2. 移动端导航切换 ===
  function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 防止页面滚动
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  // 点击导航链接关闭移动端菜单
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // 点击菜单外区域关闭
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768 && 
        navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // === 3. 滚动显示动画 (Intersection Observer) ===
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === 4. 数字计数动画 ===
  function animateNumber(element, target) {
    const duration = 2000; // 2秒
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 缓动函数 - easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (target - startValue) * easeProgress);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // 数字动画观察器
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target, 10);
        if (!isNaN(target)) {
          animateNumber(entry.target, target);
        }
        numberObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  statNumbers.forEach(num => numberObserver.observe(num));

  // === 5. 技能条动画 ===
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // 延迟一点开始动画
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
        
        barObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.3
  });

  statBars.forEach(bar => barObserver.observe(bar));

  // === 6. 功能展示标签切换 ===
  function switchFeature(tabName) {
    const data = featureData[tabName];
    if (!data) return;

    // 更新标签状态
    featureTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      }
    });

    // 图片淡入淡出效果
    featureImage.style.opacity = '0';
    
    setTimeout(() => {
      featureImage.src = data.image;
      featureImage.alt = data.title;
      featureImage.style.opacity = '1';
      
      // 重置手机框滚动位置到顶部
      const phoneFrame = document.querySelector('.phone-frame');
      if (phoneFrame) {
        phoneFrame.scrollTop = 0;
      }
    }, 150);

    // 更新文字内容
    featureTitle.textContent = data.title;
    featureDesc.textContent = data.desc;

    // 更新功能列表
    const featureList = document.querySelector('.feature-list');
    if (featureList) {
      featureList.innerHTML = data.features.map(f => `
        <li class="feature-list-item">
          <span class="check-icon">✓</span>
          <span>${f}</span>
        </li>
      `).join('');
    }
  }

  featureTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const tabName = this.dataset.tab;
      switchFeature(tabName);
    });
  });

  // === 7. 移动端功能标签切换 ===
  const mobileTabs = document.querySelectorAll('.mobile-feature-tab');
  const mobileFeatureImage = document.getElementById('mobileFeatureImage');
  const mobileFeatureTitle = document.getElementById('mobileFeatureTitle');
  const mobileFeatureDesc = document.getElementById('mobileFeatureDesc');
  const mobileTabsScroll = document.querySelector('.mobile-tabs-scroll');

  function switchMobileFeature(tabName) {
    const data = featureData[tabName];
    if (!data) return;

    // 更新标签状态
    mobileTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
        // 自动滚动到可见位置
        if (mobileTabsScroll) {
          const tabLeft = tab.offsetLeft;
          const scrollCenter = tabLeft - (mobileTabsScroll.clientWidth / 2) + (tab.clientWidth / 2);
          mobileTabsScroll.scrollTo({ left: Math.max(0, scrollCenter), behavior: 'smooth' });
        }
      }
    });

    // 更新手机框图片
    if (mobileFeatureImage) {
      mobileFeatureImage.style.opacity = '0';
      setTimeout(() => {
        mobileFeatureImage.src = data.image;
        mobileFeatureImage.alt = data.title;
        mobileFeatureImage.style.opacity = '1';
        // 重置手机框滚动位置到顶部
        const phoneMockup = mobileFeatureImage.closest('.phone-mockup');
        if (phoneMockup) phoneMockup.scrollTop = 0;
      }, 150);
    }

    // 更新描述
    if (mobileFeatureTitle) mobileFeatureTitle.textContent = data.title;
    if (mobileFeatureDesc) mobileFeatureDesc.textContent = data.desc;
  }

  mobileTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      switchMobileFeature(this.dataset.tab);
    });
  });

  // === 8. 移动端底部下载栏可见性 ===
  const mobileDownloadBar = document.getElementById('mobileDownloadBar');
  const downloadSection = document.getElementById('download');
  
  function toggleDownloadBar() {
    if (!mobileDownloadBar || window.innerWidth > 768) {
      if (mobileDownloadBar) mobileDownloadBar.style.display = 'none';
      return;
    }

    if (!downloadSection) return;

    const rect = downloadSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 下载区域进入视口时隐藏，离开时显示
    if (rect.top < windowHeight && rect.bottom > 0) {
      mobileDownloadBar.style.opacity = '0';
      mobileDownloadBar.style.pointerEvents = 'none';
      mobileDownloadBar.style.transform = 'translateY(20px)';
    } else {
      mobileDownloadBar.style.opacity = '1';
      mobileDownloadBar.style.pointerEvents = 'auto';
      mobileDownloadBar.style.transform = 'translateY(0)';
    }
  }

  // === 9. 回到顶部 ===
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  backToTop.addEventListener('click', scrollToTop);

  // === 8. 平滑滚动（兼容处理） ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight + 1;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === 9. 导航高亮当前区块 ===
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY;
    const navHeight = navbar.offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (!navLink) return;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => link.style.color = '');
        navLink.style.color = 'var(--accent-gold-light)';
      }
    });
  }

  // === 10. 窗口大小变化处理 ===
  let resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 桌面端时关闭移动端菜单
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 100);
  }

  // === 11. 滚动事件节流 ===
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavbarScroll();
        highlightNav();
        toggleDownloadBar();
        ticking = false;
      });
      ticking = true;
    }
  }

  // === 初始化 ===
  function init() {
    // 绑定事件
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    navToggle.addEventListener('click', toggleMobileMenu);

    // 初始执行一次
    handleNavbarScroll();
    toggleDownloadBar();
    
    // 首屏元素立即显示
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, 200 + index * 200);
    });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // === 额外：下载按钮点击统计（预留）===
  const downloadBtn = document.querySelector('.download .btn-primary');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      // 可添加下载统计逻辑
      console.log('APK 下载按钮被点击');
    });
  }

})();
