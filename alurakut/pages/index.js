import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

function ProfileSidebar(prop) {
  return (
    <Box>
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

export default function Home() {
  const githubUser = 'lucalexand';
  const comunidades = ['Alurakut'];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ];

  return (
    <>
      <AlurakutMenu />
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
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log(e);

              comunidades.push('Alura Starts')
              
            }}>
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

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://placehold.it/300x300`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade <span>({pessoasFavoritas.length})</span>
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/* <Box>Comunidades</Box> */}
        </div>
      </MainGrid>
    </>
  );
}
