const initialState = {
    allUsers : [
        {
            id : '1',
            namaBrand : 'Soto Ayam 99',
            coordinat : {
                latitude : -6.2601641,
                longitude : 106.7797977
            },
            photoUrl : 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/06/906065/670x335/4-resep-dan-cara-membuat-soto-ayam-bening-enak-dan-sederhana-kln.jpg'
        },
        {
            id : '2',
            namaBrand : 'Bakso Bang Zainul',
            coordinat : {
                latitude : -6.2601641,
                longitude : 106.7797977
            },
            photoUrl : 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/06/906065/670x335/4-resep-dan-cara-membuat-soto-ayam-bening-enak-dan-sederhana-kln.jpg'
        },
        {
            id : '3',
            namaBrand : 'Bakmi Naga 99',
            coordinat : {
                latitude : -6.2601641,
                longitude : 106.7797977
            },
            photoUrl : 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/06/906065/670x335/4-resep-dan-cara-membuat-soto-ayam-bening-enak-dan-sederhana-kln.jpg'
        },
        {
            id : '4',
            namaBrand : 'Sate Babat',
            coordinat : {
                latitude : -6.2601641,
                longitude : 106.7797977
            },
            photoUrl : 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/06/906065/670x335/4-resep-dan-cara-membuat-soto-ayam-bening-enak-dan-sederhana-kln.jpg'
        },
        {
            id : '5',
            namaBrand : 'Nasi Kuning',
            coordinat : {
                latitude : -6.2531124,
                longitude : 106.7776367
            },
            photoUrl : 'https://cdns.klimg.com/merdeka.com/i/w/news/2017/11/06/906065/670x335/4-resep-dan-cara-membuat-soto-ayam-bening-enak-dan-sederhana-kln.jpg'
        },

    ]
}


export default (state=initialState, action) => {
    switch(action.type) {
        default : 
            return {
                ...state
            }
    }
}