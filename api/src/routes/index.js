const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db')
const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//trae toda la ifo de la api
const getApiInfo = async function () {
    const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)
    
    return infoApi.data.results

}

//trae toda la info de la db
const getDbInfo = async function () {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }

    })
}

const getRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = dbInfo.concat(apiInfo)
    return allInfo
}

router.get('/recipes', async (req, res) => {
    const name= req.query.name
    const allRecipes= await getRecipes()

    if(name){
        let byName = await allRecipes.filter(r => r.title.toLowerCase().includes(name.toLowerCase()))
        byName.length ?
            res.status(200).json(byName) :
            res.status(404).send('No existe receta con ese nombre')
    } else {
        res.status(200).json(allRecipes)
    }
})

router.get('/recipes/:id', async (req, res) => {
    const id= req.params.id
    let allRecipes= await getRecipes()
    
    if(id){
        let byId= await allRecipes.filter(r=> r.id == id)
        byId.length ?
        res.status(200).json(byId) :
        res.status(404).send('No hay resultado')
    }
})

router.get('/types', async (req, res)=> {
    let allRecipes= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const types= await allRecipes.data.results.map(r=> r.diets)
    let diets= types.flat()
    let typeDiets= [...new Set(diets),'vegetarian']
    typeDiets.forEach(r => {
        Diet.findOrCreate({
            where: { name: r }
        })
    });
    const allDiets = await Diet.findAll()
    res.json(allDiets)

})

router.post('/recipe', async (req, res)=> {
    let {title, summary, aggregateLikes, healthScore, analyzedInstructions, dishTypes, image, diets}= req.body
    const createRecipe= await Recipe.create({
        title, 
        summary, 
        aggregateLikes, 
        healthScore, 
        analyzedInstructions, 
        dishTypes, 
        image
    })
    const recipeDb = await Diet.findAll({ where: { name: diets } })
    createRecipe.addDiet(recipeDb)
    res.send('Receta creada exitosamente!')
})

// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos


module.exports = router;

// const info = await infoApi.data.results.map((r) => {        
    //     return {
    //         id: r.id,
    //         title: r.title,
    //         summary: r.summary,
    //         aggregateLikes: r.aggregateLikes,
    //         healthScore: r.healthScore,
    //         analyzedInstructions: r.analyzedInstructions.steps.map(r=> r.step),
    //         dishTypes: r.dishTypes.map(r => r),
    //         image: r.image,
    //         servings: r.servings,
    //         diets: r.diets.map(r => r)
    //     }
    // })    
    // return info