import React from 'react';

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import {LittleRelationBox} from "../src/components/LittleRelationBox"

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

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
  const randomUser = 'fvxstx';
  
  // Mudando o estado de alguma coisa
  // Comunidades: é uma variavel que recebe o primeiro valor
  // setComunidades: ele atribui outro valor pra comunidades a partir de alguma coisa
  const [comunidades, setComunidades] = React.useState([
    {
      id: "1",
      name: 'Eu odeio acordar cedo',
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
      url: "https://www.uol.com.br/vivabem/listas/tem-dificuldade-de-acordar-cedo-entao-veja-9-dicas-que-mudarao-sua-vida.htm"
    },
    {
      id: '2',
      name: "Brasil Grime Show",
      image: "../images/brasil.jpg",
      url: "https://www.youtube.com/channel/UCPuIr0zPwjWcTO4WSEK6hGg"
    },
    {
      id: '3',
      name: "Nerdologia",
      image: "../images/nerdologia.jpg",
      url: "https://www.youtube.com/channel/UClu474HMt895mVxZdlIHXEA"
    },
    {
      id: '4',
      name: "Rap BR",
      image: "../images/rapBr.png",
      url: "https://www.youtube.com/watch?v=OtUgra5BtwI&t=782s"
    },
    {
      id: '5',
      name: "Alura",
      image: "https://www.alura.com.br/assets/img/alura-share.1617727198.png",
      url: "https://www.alura.com.br/"
    },
    {
      id: '6',
      name: "Investimentos",
      image: "../images/investimento.jpg",
      url: "https://www.rico.com.vc/"
    }
  ])

  const [favoritePeople, setFavoritePeople] = React.useState([
    {
      name:"omariosouto",
      image:"https://github.com/omariosouto.png",
      url:"https://github.com/omariosouto"
    }, 
    {
      name:'peas',
      image:"https://github.com/peas.png",
      url:"https://github.com/peas"
    },
    {
      name:'juunegreiros', 
      image:"https://github.com/juunegreiros.png",
      url:"https://github.com/juunegreiros"
    },
    {
      name:'Irand27',
      image:"https://github.com/Irand27.png",
      url:"https://github.com/Irand27"
    },
    {
      name:'brenda1602',
      image:"https://github.com/brenda1602.png",
      url:"https://github.com/brenda1602"
    },
    {
      name:'filhodanuvem',
      image:"https://github.com/filhodanuvem.png",
      url:"https://github.com/filhodanuvem"
    },
    {
      name:'maykbrito',
      image:"https://github.com/maykbrito.png",
      url:"https://github.com/maykbrito"
    }
  ])

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
                image: dadosDoForm.get('image'),
                url: dadosDoForm.get('url')
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

              <div>
                <input 
                  placeholder="Coloque uma URL para sua comunidade"
                  name="url"
                  aria-label="Coloque uma URL para sua comunidade"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <LittleRelationBox title="Pessoas da comunidade" arrayProfiles={favoritePeople} />
            
          <LittleRelationBox title="Comunidade" arrayProfiles={comunidades}/>
        </div>
      </MainGrid>
    </>
  );
}
