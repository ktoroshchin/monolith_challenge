const fetch = require('node-fetch');

/**
 * @returns {[string]} An array of image URL
 */
const getDoggos = async(breed) => {
    const options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }

    try {
        const data = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`,options)
        const imgUrl = await data.json()

        if(imgUrl.status === 'success') {
            return [imgUrl.message]
        } else {
            throw new Error('Something went wrong')
        }
    } catch(err) {
        return err
    }
}

getDoggos('african').then(result => console.log(result))