import { SiteClient } from 'datocms-client';

export default async function criandoComunidades(req, res) {
  if(req.method === 'POST') {
    const TOKEN = '4070ce4c45efbe8782a875be2d5d39';
    
    const client = new SiteClient(TOKEN);
    
    const { title, imageUrl, creatorSlug } = req.body;
    const registroCriado = await client.items.create({
      itemType: '968516', //ID do Model de "Community" criado pelo Dato
      title,
      imageUrl,
      creatorSlug
    });
    
    
    res.json({
      dados: 'Algum dado qualquer',
      registroCriado
    });
    return;
  }

  res.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}
