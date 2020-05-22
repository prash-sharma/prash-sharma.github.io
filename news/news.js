
async function getData(){
    const url = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=e9d3a9efed9545d486a9367a64d54173';

    let response = await fetch(url);
    let data = await response.json();
    return data
}
let a = getData();

a.then((data)=>{
    console.log(data);
    
}).catch((err) => {
    console.log(err);
})
