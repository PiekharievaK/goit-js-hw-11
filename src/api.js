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
    

