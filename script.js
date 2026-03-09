const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0';
document.head.appendChild(viewport);

const style = document.createElement('style');
style.textContent = `
.wiki-content {
  width: 100% !important;
  padding: 0 10px !important;
  box-sizing: border-box !important;
}
.wiki-content img {
  max-width: 100% !important;
  height: auto !important;
}
.wiki-content table {
  display: block !important;
  overflow-x: auto !important;
  max-width: 100% !important;
}
@media (max-width: 768px) {
  .wiki-content {
    font-size: 14px !important;
    line-height: 1.5 !important;
  }
}
`;
document.head.appendChild(style);
