(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.querySelector('.scroll-progress');
  const glow = document.querySelector('.cursor-glow');

  const productOsStyles = document.createElement('style');
  productOsStyles.textContent = `
    .product-os-strip{grid-column:span 12;min-height:0;padding:28px 30px;background:linear-gradient(115deg,rgba(142,162,255,.1),rgba(15,22,31,.96) 42%,rgba(123,244,219,.07));}
    .product-os-strip::before{width:430px;height:430px;top:-260px;right:-90px;background:radial-gradient(circle,rgba(142,162,255,.18),transparent 66%);}
    .product-os-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr);gap:38px;align-items:center;}
    .product-os-kicker{margin-top:24px;color:var(--blue);font-size:10px;font-weight:850;letter-spacing:.14em;text-transform:uppercase;}
    .product-os-strip .project-title{margin-top:10px;font-size:clamp(30px,3.6vw,48px);}
    .product-os-strip .project-summary{max-width:690px;}
    .product-os-status{color:#d8deff;background:rgba(142,162,255,.09);border-color:rgba(142,162,255,.22);}
    .product-os-system{padding:18px;border:1px solid var(--line);border-radius:20px;background:rgba(7,11,17,.34);}
    .product-os-label{margin-bottom:12px;color:#aeb9c7;font-size:10px;font-weight:820;letter-spacing:.12em;text-transform:uppercase;}
    .product-os-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;}
    .product-os-step{min-height:74px;padding:11px 9px;border:1px solid var(--line);border-radius:13px;background:rgba(255,255,255,.03);}
    .product-os-step small{display:block;color:var(--blue);font:800 9px ui-monospace,SFMono-Regular,Menlo,monospace;}
    .product-os-step b{display:block;margin-top:16px;font-size:11px;line-height:1.25;}
    .product-os-outcome{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:9px;padding:12px 13px;border-radius:13px;color:#10151b;background:linear-gradient(90deg,#cdd7ff,#a7f4e8);}
    .product-os-outcome small{font-size:9px;font-weight:850;letter-spacing:.11em;text-transform:uppercase;}
    .product-os-outcome strong{text-align:right;font-size:12px;}
    @media(max-width:980px){.product-os-grid{grid-template-columns:1fr;}.product-os-steps{grid-template-columns:repeat(5,minmax(105px,1fr));overflow-x:auto;padding-bottom:3px;}}
    @media(max-width:720px){.product-os-strip{padding:22px;}.product-os-system{padding:13px;}.product-os-outcome{align-items:flex-start;flex-direction:column;}.product-os-outcome strong{text-align:left;}}
    @media print{.product-os-strip{padding:28px!important;}.product-os-system{background:#fff!important;}.product-os-outcome{color:#10151b!important;background:#edf0f4!important;}}
  `;
  document.head.appendChild(productOsStyles);

  const sectionCopy = document.querySelector('.section-copy');
  if (sectionCopy) {
    sectionCopy.textContent = 'The Injective work shows how I turn emerging technology into products and operating systems teams can use. The independent products show the same approach applied end to end, from product idea to a working system.';
  }

  const coreFilter = document.querySelector('.filter[data-filter="public"]');
  if (coreFilter) coreFilter.textContent = 'Injective + public';

  const playbookCard = [...document.querySelectorAll('.project-card')].find((card) => {
    return card.querySelector('.project-title')?.textContent.trim() === 'Agentic Delivery Playbook';
  });

  if (playbookCard) {
    playbookCard.insertAdjacentHTML('afterend', `
      <article class="project-card product-os-strip public reveal" data-category="public" aria-label="Injective Product OS">
        <div class="product-os-grid">
          <div>
            <div class="card-top">
              <span class="status product-os-status">Internal at Injective · Team leverage</span>
              <span class="index">PRODUCT OS</span>
            </div>
            <div class="product-os-kicker">How I scaled the work</div>
            <h3 class="project-title">Injective Product OS</h3>
            <p class="project-summary">An internal AI native product operating system that helps teams move from research and opportunity assessment to product requirements, decisions and delivery updates with a consistent quality bar.</p>
            <p class="role">Role: <span>Designed the workflows and operating model, then applied them across several Injective product areas to shorten the path from an early idea to an executable plan.</span></p>
          </div>
          <div class="product-os-system" aria-label="Product OS workflow">
            <div class="product-os-label">One consistent path</div>
            <div class="product-os-steps">
              <div class="product-os-step"><small>01</small><b>Research</b></div>
              <div class="product-os-step"><small>02</small><b>Assess</b></div>
              <div class="product-os-step"><small>03</small><b>Define</b></div>
              <div class="product-os-step"><small>04</small><b>Decide</b></div>
              <div class="product-os-step"><small>05</small><b>Deliver</b></div>
            </div>
            <div class="product-os-outcome"><small>Outcome</small><strong>Faster movement from ambiguity to execution</strong></div>
          </div>
        </div>
      </article>
    `);
  }

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? `${(scrollY / max) * 100}%` : '0%';
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', (event) => {
      glow.style.opacity = '1';
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

  document.querySelectorAll('[data-print]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.print();
    });
  });

  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
      document.querySelectorAll('.project-card').forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -3.2}deg) rotateY(${x * 3.2}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  const canvas = document.getElementById('network');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  let points = [];
  let animationFrame;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = rect.width < 600 ? 22 : 38;
    points = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 0.6
    }));
  };

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);
    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;
      if (point.x < 0 || point.x > rect.width) point.vx *= -1;
      if (point.y < 0 || point.y > rect.height) point.vy *= -1;
      context.beginPath();
      context.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? 'rgba(215,255,79,.55)' : 'rgba(187,207,235,.42)';
      context.fill();
      for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
        const next = points[nextIndex];
        const distance = Math.hypot(point.x - next.x, point.y - next.y);
        if (distance < 100) {
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.strokeStyle = `rgba(164,190,220,${0.12 * (1 - distance / 100)})`;
          context.lineWidth = 0.7;
          context.stroke();
        }
      }
    });
    if (!reduced) animationFrame = requestAnimationFrame(draw);
  };

  resize();
  draw();
  addEventListener('resize', () => {
    cancelAnimationFrame(animationFrame);
    resize();
    draw();
  }, { passive: true });
})();
