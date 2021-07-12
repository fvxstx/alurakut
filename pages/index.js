import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props){
  return (
    <Box>
      <img src={`https://github.com/${props.gitUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

export default function Home() {
  const randomUser = 'fvxstx';
  const favoritePeople = ["fvxstx", "omariosouto", 'peas', 'juunegreiros']

  return (
    <>
      <AlurakutMenu />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitUser={randomUser}/>
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((favoritePerson) => {
                return (
                  <li>
                    <a href={`/users/${favoritePerson}`} key={favoritePerson}>
                      <img src={`https://github.com/${favoritePerson}.png`}/>
                      <span>{favoritePerson}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>

  );
}
