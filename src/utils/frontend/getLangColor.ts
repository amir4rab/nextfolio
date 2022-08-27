const getLangColor = (lang: string) => {
  switch (lang.toLowerCase()) {
    case 'typescript':
      return '#3178c6';
    case 'javascript':
      return '#f1e05a';
    case 'python':
      return '#3572A5';
    case 'html':
      return '#e34c26';
    case 'astro':
      return '#ff5a03';
    case 'tsx':
      return '#3178c6';
    case 'rust':
      return '#dea584';
    case 'postcss':
      return '#dc3a0c';
    case 'scss':
      return '#c6538c';
    case 'css':
      return '#563d7c';
    case 'c':
      return '#555555';
    case 'c++':
      return '#555555';
    case 'go':
      return '#00ADD8';
    case 'c#':
      return '#178600';
    default:
      return '#3178c6';
  }
};

export default getLangColor;
