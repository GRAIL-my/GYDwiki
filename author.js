const elements = {
  authorContact: document.querySelector('.author .contact'),
  if1Polarbear: document.querySelector('.if1 .polarbear'),
  if1Q: document.querySelector('.if1 .q'),
  if2Penguin: document.querySelector('.if2 .penguin'),
  if2A: document.querySelector('.if2 .a')
};

// 2. 视窗检测逻辑
function isInViewport(el) {
  if (!el || !el.getBoundingClientRect) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight * 0.9 && rect.bottom >= -100;
}

function handleScroll() {

  // if1
  if (elements.if1Polarbear) {
    const inView = isInViewport(elements.if1Polarbear);
    elements.if1Polarbear.style.opacity = inView ? '1' : '0';
    elements.if1Polarbear.style.transform = inView ? 'translateX(0)' : 'translateX(-20px)';
  }
  if (elements.if1Q) {
    const inView = isInViewport(elements.if1Q);
    elements.if1Q.style.opacity = inView ? '1' : '0';
    elements.if1Q.style.transform = inView ? 'translateX(0)' : 'translateX(20px)';
  }

  // if2
  if (elements.if2Penguin) {
    const inView = isInViewport(elements.if2Penguin);
    elements.if2Penguin.style.opacity = inView ? '1' : '0';
    elements.if2Penguin.style.transform = inView ? 'translateX(0)' : 'translateX(20px)';
  }
  if (elements.if2A) {
    const inView = isInViewport(elements.if2A);
    elements.if2A.style.opacity = inView ? '1' : '0';
    elements.if2A.style.transform = inView ? 'translateX(0)' : 'translateX(-20px)';
  }
}

// 初始化
function initStyles() {
  if (elements.if1Polarbear) {
    elements.if1Polarbear.style.opacity = '0';
    elements.if1Polarbear.style.transform = 'translateX(-20px)';
    elements.if1Polarbear.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  if (elements.if1Q) {
    elements.if1Q.style.opacity = '0';
    elements.if1Q.style.transform = 'translateX(20px)';
    elements.if1Q.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }

  if (elements.if2Penguin) {
    elements.if2Penguin.style.opacity = '0';
    elements.if2Penguin.style.transform = 'translateX(20px)';
    elements.if2Penguin.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  if (elements.if2A) {
    elements.if2A.style.opacity = '0';
    elements.if2A.style.transform = 'translateX(-20px)';
    elements.if2A.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
}

function debounce(func, delay = 16) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

window.addEventListener('load', () => {
  initStyles();
  handleScroll();
  window.addEventListener('scroll', debounce(handleScroll));
  window.addEventListener('resize', debounce(handleScroll));
});