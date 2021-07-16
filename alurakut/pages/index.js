import React from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import {
  ProfileRelations,
  ProfileRelationsBoxWrapper,
} from '../src/components/ProfileRelations/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  // const array = [];
  //https://stackoverflow.com/questions/42739256/how-get-random-item-from-es6-map-or-set
  // //const getRandomItem = iterable => iterable.get([...iterable.keys()][Math.floor(Math.random() * iterable.size)])
  // for (let i = 0; i < 6; i++) {
  //   array.push(items[Math.floor(Math.random() * items.length)]);
  // }

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} <span>({items.length})</span>
      </h2>
      <ul>
        {items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.login}`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const githubUser = 'lucalexand';
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = [
    {
      id: Math.floor(Math.random() * 100000),
      title: 'juunegreiros',
      imageUrl: `https://github.com/juunegreiros.png`,
    },
    {
      id: Math.floor(Math.random() * 100000),
      title: 'omariosouto',
      imageUrl: `https://github.com/omariosouto.png`,
    },
    {
      id: Math.floor(Math.random() * 100000),
      title: 'peas',
      imageUrl: `https://github.com/peas.png`,
    },
    {
      id: Math.floor(Math.random() * 100000),
      title: 'rafaballerini',
      imageUrl: `https://github.com/rafaballerini.png`,
    },
    {
      id: Math.floor(Math.random() * 100000),
      title: 'marcobrunodev',
      imageUrl: `https://github.com/marcobrunodev.png`,
    },
    {
      id: Math.floor(Math.random() * 100000),
      title: 'felipefialho',
      imageUrl: `https://github.com/felipefialho.png`,
    },
  ];

  // const seguidores = await fetch('http://api.github.com/users/peas/followers').json();
  // console.log(seguidores)
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch('http://api.github.com/users/peas/followers')
      .then((resposta) => resposta.json())
      .then((seguidores) => setSeguidores(seguidores));

    const token = '0a68ba65cab36f0040da99effe268a';
    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          allCommunities { 
            title
            id
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setComunidades(res.data.allCommunities);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet
              recados={6}
              fotos={11}
              videos={1}
              fas={2}
              mensagens={15}
              confiavel={3}
              legal={3}
            />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: `https://picsum.photos/300?random=${Math.floor(
                    Math.random() * 100000
                  )}`,
                };
                console.log(comunidade);

                setComunidades([...comunidades, comunidade]);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox title={'Seguidores'} items={seguidores} />
          <ProfileRelations title={'Comunidades'} items={comunidades} />
          <ProfileRelations
            title={'Pessoas da comunidade'}
            items={pessoasFavoritas}
          />
        </div>
      </MainGrid>
    </>
  );
}
