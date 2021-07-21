import { SiteClient } from 'datocms-client';


export default async function recebedorRequest(req, res) {
    if(req.method === "POST") {
        // TOKEN: é o token pego la no DATOCMS de permissão pra poder postar a comunidade
        const TOKEN = "02330f0f74ba6056df7cd0bce5b236"
        const client = new SiteClient(TOKEN);
    
        const registerCreate = await client.items.create({
            itemType: '968066', // ID do Model de "Community" no DatoCMS
            ...req.body,
            /* name: "Comunidade Teste",
            image: "https://github.com/fvxstx.png",
            url: "https://github.com/fvxstx",
            creatorSlug: "fvxstx", */
        })
    
        res.json({
            dados: 'salve',
            registerCreate: registerCreate
        })
        return
    }
    
}