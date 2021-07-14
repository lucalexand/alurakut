import React from 'react';
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import {ProfileRelations, ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

function ProfileSidebar(prop) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${prop.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />

      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${prop.githubUser}`}>
          @{prop.githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items}) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} <span>({items.length})</span>
      </h2>
      {/* <ul>
        {array.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={`/users/${itemAtual.title}`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          );
        })}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'lucalexand';
  const [comunidades, setComunidades] = React.useState([
    {
      id: '4164132564162313',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
  ]);
  const pessoasFavoritas = [
    {
      id: new Date().toISOString(),
      title: 'juunegreiros',
      image: `https://github.com/juunegreiros.png`
    },
    {
      id: new Date().toISOString(),
      title: 'omariosouto',
      image: `https://github.com/omariosouto.png`
    },
    {
      id: new Date().toISOString(),
      title: 'peas',
      image: `https://github.com/peas.png`
    },
    {
      id: new Date().toISOString(),
      title: 'rafaballerini',
      image: `https://github.com/rafaballerini.png`
    },
    {
      id: new Date().toISOString(),
      title: 'marcobrunodev',
      image: `https://github.com/marcobrunodev.png`
    },
    {
      id: new Date().toISOString(),
      title: 'felipefialho',
      image: `https://github.com/felipefialho.png`
    }
  ];

  // const seguidores = await fetch('http://api.github.com/users/peas/followers').json();
  // console.log(seguidores)
  const seguidores = []
  React.useEffect(() => {
    fetch('http://api.github.com/users/peas/followers')
    .then(resposta => {
      return resposta.json()
    })
    .then(seguidores => {
      console.log(seguidores)
    })
  })

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
          <ProfileRelations array={comunidades} title={'Comunidades'} />
          <ProfileRelations array={pessoasFavoritas} title={'Pessoas da comunidade'} />
        </div>
      </MainGrid>
    </>
  );
}
