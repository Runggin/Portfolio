document.addEventListener("DOMContentLoaded", function() {
  console.log('script.js loaded');
  const progress = document.querySelector('.progress');
  const loader = document.getElementById('loader');
  const STORAGE_KEY = 'portfolio_loader_v1';
  const FORCE_SHOW = new URLSearchParams(location.search).has('showLoader'); // use ?showLoader=1

  function hideLoader(immediate = false) {
    if (!loader) return;
    console.log('hiding loader, immediate=', immediate);
    loader.setAttribute('aria-hidden', 'true');
    if (immediate) {
      loader.style.display = 'none';
      loader.style.opacity = '0';
    } else {
      loader.style.transition = 'opacity 300ms ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 300);
    }
  }

  let shownBefore = false;
  try { shownBefore = !!localStorage.getItem(STORAGE_KEY); } catch (e) { console.warn(e); shownBefore = false; }

  console.log({ progressExists: !!progress, loaderExists: !!loader, shownBefore, FORCE_SHOW });

  if (shownBefore && !FORCE_SHOW) {
    hideLoader(true);
  } else if (progress && loader) {
    let width = 0;
    const interval = setInterval(function() {
      if (width >= 100) {
        clearInterval(interval);
        hideLoader(false);
        try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { console.warn(e); }
      } else {
        width++;
        progress.style.width = width + '%';
      }
    }, 20);
  } else {
    console.log('No loader/progress elements found - nothing to animate');
  }

  // sidebar links
  const side = document.querySelectorAll('.sidebar a');
  if (side && side.length) {
    side.forEach(a => a.addEventListener('click', () => {
      side.forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    }));
  }
});