import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'

function ProfileSidebar() {
  return (
    <Box>
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'lucalexand';

  return (
    <>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            Bem-vindo
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <Box>
            Pessoas da Comunidade
          </Box>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
