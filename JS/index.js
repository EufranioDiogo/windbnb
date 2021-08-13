function getAllPlaces() {
    fetch('./JSON/stays.json').then((response) => response.json()).then(result => {
        app.places = result;
        getPlaces({ city: 'Helsinki', country: 'Finland' })
    }).catch(error => console.log(error.message))
}


function closeSearchHeader() {
    document.querySelector('.search-panel').style.height = '0'

    setTimeout(() => {
        document.querySelector('.filter').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.filter').style.display = 'none'
        }, 700)
    }, 600)
}

function openSearchHeader() {
    document.querySelector('.filter').style.display = 'block'

    setTimeout(() => {
        document.querySelector('.filter').style.opacity = '1';
        setTimeout(() => {
            document.querySelector('.search-panel').style.height = '70vh'
        }, 1000)
    }, 500)
}


function getPlaces(locationToSearch, guestNumber = 0) {
    app.shownResults = []

    if (guestNumber == 0) {
        app.places.forEach(element => {
            app.shownResults = app.places.filter(element => locationToSearch.city == element.city && locationToSearch.country == element.country);
        })
    } else {
        app.shownResults = app.places.filter(element => locationToSearch.city == element.city && locationToSearch.country == element.country && locationToSearch.maxGuests == element.maxGuests);
    }
}

let app = new Vue({
    el: '.site-conteiner',
    data: {
        actualCity: 'Helsinki',
        actualCountry: 'Finland',
        places: [],
        searchingResuls: [],
        searchingPlaceInputBox: '',
        possiblesLocations: [],
        childGuests: 0,
        adultGuests: 0,
        locationToSearch: {},
        shownResults: [],
    },
    methods: {
        encreaseAdultGuests() {
            this.adultGuests += 1;
        },
        decreaseAdultGuests() {
            if (this.adultGuests) {
                this.adultGuests -= 1;
            }
        },
        encreaseChildGuests() {
            this.childGuests += 1;
        },
        decreaseChildGuests() {
            if (this.childGuests) {
                this.childGuests -= 1;
            }
        },
        setLocationToSearch(location) {
            this.locationToSearch = location;
            this.searchingPlaceInputBox = location.city + ', ' + location.country;
            document.querySelector('.input-field').value = location.city + ', ' + location.country;
        },
        searchPlaces() {
            if (this.searchingPlaceInputBox) {
                let aux = [];
                let flag = false;
                let re = new RegExp(this.searchingPlaceInputBox, 'ig');

                /*this.possiblesLocations this.places.filter(element => re.test(element.city + element.country))*/


                
                for (let i = 0; i < this.places.length; i++) {
                    if (re.test(this.places[i].city + this.places[i].country)) {
                        for (let j = 0; j < aux.length; j++) {
                            if (aux[j].city == this.places[i].city && aux[j].country == this.places[i].country) {
                                flag = true;
                            }
                        }
                        if (!flag) {
                            aux.push(this.places[i])
                        }
                        flag = false;
                    }
                }
                if (aux) {
                    this.possiblesLocations = aux;
                }
            }
        },
        search() {
            getPlaces(this.locationToSearch, this.totalGuests)
            if (this.shownResults.length) {
                this.actualCity = this.locationToSearch.city;
                this.actualCountry = this.locationToSearch.country;
            } else {
                this.actualCity = 'Not Found'
                this.actualCountry = 'Not Found'
            }
            closeSearchHeader()
        }
    },
    computed: {
        actualLocation() {
            return this.actualCity + ', ' + this.actualCountry;
        },
        totalGuests() {
            return this.childGuests + this.adultGuests;
        }
    }
})

document.querySelector('#close-btn').addEventListener('click', () => {
    closeSearchHeader()
})

document.querySelector('.btn-places').addEventListener('click', () => {
    document.querySelector('.guests-fields').style.opacity = '0'
    document.querySelector('.cities-country-results').style.opacity = '1'
})

document.querySelector('.btn-add-guest').addEventListener('click', () => {
    document.querySelector('.guests-fields').style.opacity = '1'
    document.querySelector('.cities-country-results').style.opacity = '0'
})

document.querySelector('.input-field').addEventListener('click', () => {
    document.querySelector('.guests-fields').style.opacity = '0'
    document.querySelector('.cities-country-results').style.opacity = '1'
})
document.querySelector('.guest-field').addEventListener('click', () => {
    document.querySelector('.guests-fields').style.opacity = '1'
    document.querySelector('.cities-country-results').style.opacity = '0'
})

if (window.innerWidth <= 750) {
    document.querySelector('.input-field').addEventListener('click', () => {
        document.querySelector('.guests-fields').style.display = 'none'
        document.querySelector('.cities-country-results').style.display = 'flex'
    })
    document.querySelector('.guest-field').addEventListener('click', () => {
        document.querySelector('.guests-fields').style.display = 'flex'
        document.querySelector('.cities-country-results').style.display = 'none'
    })
}
getAllPlaces()
