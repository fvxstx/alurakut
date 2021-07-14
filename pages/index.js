import React from 'react';
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.gitUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      
      <p>
      <a className="boxLink" href={`https://github.com/${props.gitUser}`}>
        @{props.gitUser}
      </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  // Mudando o estado de alguma coisa
  // Comunidades: é uma variavel que recebe o primeiro valor
  // setComunidades: ele atribui outro valor pra comunidades a partir de alguma coisa
  const [comunidades, setComunidades] = React.useState([{
    id: "131212",
    title: 'Eu odeio acordar cedo',
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }])

  const randomUser = 'fvxstx';
  const favoritePeople = ["fvxstx", "omariosouto", 'peas', 'juunegreiros']

  return (
    <>
      <AlurakutMenu githubUser={"fvxstx"} />

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

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              // Evitar o comportamento padrão, ele não da um refresh na tela
              e.preventDefault()

              // Pegando os dados do Form pelo name
              const dadosDoForm = new FormData(e.target)
              const comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)

            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
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
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidade ({comunidades.length})
            </h2>

            <ul>
              {comunidades.map((comuni) => {
                return (
                  <li key={comuni.id}>
                    <a href={`/users/${comuni.title}`} key={comuni.title}>
                      <img src={comuni.image}/>
                      <span>{comuni.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>

            <ul>
              {favoritePeople.map((favoritePerson) => {
                return (
                  <li key={favoritePerson}>
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
