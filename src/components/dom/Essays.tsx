import Parser from 'rss-parser';
import EssaysClient from './EssaysClient';

export default async function Essays() {
  let posts = [];
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://ericdominici18.substack.com/feed');
    posts = feed.items.slice(0, 3).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.pubDate || '').toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      contentSnippet: item.contentSnippet || item.content?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...'
    }));
  } catch (error) {
    console.error("Error fetching Substack RSS:", error);
    // Fallback posts if Substack fails
    posts = [
      {
        title: "Arquitecto de sí mismo",
        link: "https://ericdominici18.substack.com",
        pubDate: "Archivo Local",
        contentSnippet: "El caos es el estado natural de la experiencia subjetiva, es la inercia social. El orden, por el contrario, es una arquitectura interna deliberada, un acto de rebeldía extraordinaria."
      },
      {
        title: "El Vínculo Desechable",
        link: "https://ericdominici18.substack.com",
        pubDate: "Archivo Local",
        contentSnippet: "La tecnología nos ahoga en dopamina instantánea. Perfiles curados, rapidez de descarte. La verdadera disonancia ocurre cuando detienes el tiempo, cuando eliges arder en lugar de solo durar."
      }
    ];
  }

  return <EssaysClient posts={posts} />;
}
