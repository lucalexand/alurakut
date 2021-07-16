import SiteClient from 'datocms-client';

export default async function recebedorDeRequests(req, res) {
  const TOKEN = '4070ce4c45efbe8782a875be2d5d39';

  const client = new SiteClient(TOKEN);

  const registroCriado = await client.items.create({
    itemType: '968516', //ID do Model de "Community" criado pelo Dato
    title: 'Amantes de RPG',
    imageUrl:
      'https://media.istockphoto.com/vectors/tattoo-style-icon-of-a-d20-dice-vector-id1208178426?b=1&k=6&m=1208178426&s=170667a&w=0&h=4oVlsUh_TfsPKPvETJZshCImv6-4FHvwcW5o29AeJMs=',
    creatorSlug: 'lucalexand',
  });

  res.json({
    dados: 'Algum dado qualquer',
  });
}
