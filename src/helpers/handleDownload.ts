// function for cv downloading
export const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/MariiaSmolianskaiaFrontendDev.pdf';
  link.download = 'MariiaSmolianskaiaFrontendDev.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
};
