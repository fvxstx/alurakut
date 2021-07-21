import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import LittleRelationBox from "../src/components/LittleRelationBox"

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar(props){
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      
      <p>
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const randomUser = props.githubUser;
  
  // Mudando o estado de alguma coisa
  // Comunidades: é uma variavel que recebe o primeiro valor
  // setComunidades: ele atribui outro valor pra comunidades a partir de alguma coisa
  const [comunidades, setComunidades] = React.useState([])

  const [favorite, setFavorite] = React.useState([])
  
  const [followers, setFollowers] = React.useState([])

  React.useEffect(() => {
    // API Git
    fetch(`https://api.github.com/users/fvxstx/followers`)
    .then(async (res) => {
      const response = await res.json()
      setFollowers(response)
    })
    
    // API DatoCMS Community
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f133753dd654bb05465d9a8c603c6a',
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          name 
          image
          url
          creatorSlug
        }
      }` })
    }) 
    .then(async (res) => {
      const response = await res.json()
      const CommunityDato = response.data.allCommunities
      setComunidades(CommunityDato)
    })

    // API DatoCMS Favorite
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'f133753dd654bb05465d9a8c603c6a',
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ "query": `query {
        allFavorites {
          id,
          name,
          image,
          url
        }
      }` })
    })
    .then(async (res) => {
      const response = await res.json()
      const favoriteDato = response.data.allFavorites
      setFavorite(favoriteDato)
    })

  }, [])

  

  return (
    <>
      <AlurakutMenu githubUser={"fvxstx"} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={randomUser}/>
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="name">
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
                name: dadosDoForm.get('name'),
                image: dadosDoForm.get('image'),
                url: dadosDoForm.get('url'),
                creatorSlug: randomUser
              }

              fetch('/api/community', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (res) => {
                const dados = await res.json();
                const comunidade = dados.registerCreate
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas)
              })
            }}>
              
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="name" 
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
          <LittleRelationBox title="Test" arrayProfiles={followers}/>

          <LittleRelationBox title="Pessoas da comunidade" arrayProfiles={favorite} />
            
          <LittleRelationBox title="Comunidade" arrayProfiles={comunidades}/>
        </div>
      </MainGrid>
    </>
  );
}


// Validando a entrada do usuario
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  
  const { isAuthenticated } = await fetch('http://alurakut-eight-pi.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((res) => res.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }
  }
}