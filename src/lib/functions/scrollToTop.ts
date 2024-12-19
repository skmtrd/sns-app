export const scrollToTop = () => {
  const element = document.getElementById('mainContent');
  element?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
