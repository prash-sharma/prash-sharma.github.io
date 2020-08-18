const APIKEY = 'a564c5e16abcb2d584dafb991599e534'

const requests = {
    fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
    fetchDocumentaries: `/discover/movie?api_key=${APIKEY}&with_genres=99`,
    fetchNetflixOriginals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
}

export default requests
