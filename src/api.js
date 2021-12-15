import axios from "axios";

export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImagesCards() {
            const apiParams = {
                method: 'get',
                baseURL: 'https://pixabay.com/api/',
                params: {
                    key: `24814635-98ab646e956d73723bbfbc5eb`,
                    q: `${this.searchQuery}`,
                    image_type: `photo`,
                    orientation: `horizontal`,
                    safesearch: true,
                    per_page: 40,
                    page: `${this.page}`,
                }
            }
        
        try {
            const response = await axios(apiParams);
            const data = response.data;
            console.log(data)
            this.nextPage();
            console.log(this.page)
            return data;
                    
        }
        catch (error) {
            console.error(error);
        }
    }


  nextPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}
    
// КОД КАТИ
// import axios from "axios";


// export default class NewsApiService{
//     constructor() {
//         this.searchQuery = '';
//       this.page = 1;
     
      
//     }
//   async fetchGalleryCards() {
//     const axiosOptions = {
//         method: 'get',
//     url: 'https://pixabay.com/api/',
//       params: {
//           key: '24753082-868cb2bb63826684a408e0cdf',
//            q: `${this.searchQuery}`,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: `${this.page}`,
//         per_page: 40,
//       },
      
//     };
//      try {
//         const response = await axios( axiosOptions );
        
//         const data = response.data;
//         // console.log(data)
//         this.incrementPage();
//          return data;
//     }
//     catch (error) {
//       console.error(error)
// }

//     }

  
 
  
//   incrementPage() {
//     this.page +=1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//     get query() {
//         return this.searchQuery;
//     };

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     };
// }



















  //   async fetchGalleryCards() {
  //   this.incrementPage();
  //     return await axios({
  //       method: 'get',
  //       url: 'https://pixabay.com/api/',
  //       params: {
  //         key: '24753082-868cb2bb63826684a408e0cdf',
  //         q: `${this.searchQuery}`,
  //         page: `${this.page}`,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //         safesearch: 'true',
  //         per_page: 40,
  //       },
  //     });
     
  // }