export const formatVideoUrl = (link?: string) => {
  if (!link) {
    return '';
  }
  if (link.includes('/embed/')) {
    return link;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = link.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return `https://www.youtube.com/embed/${id}`;
};

export const limitChar = (str: string, limit: number) => {
  return str.length > limit ? `${str.slice(0, limit)}...` : str;
};
