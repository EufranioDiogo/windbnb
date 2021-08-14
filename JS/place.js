async function getPlace() {
    const placeID = Number.parseInt(window.location.href.split('?')[1].split('=')[1]);

    await fetch('../JSON/stays.json')
    .then(res => res.json())
    .then(data => {
        app.place = data.filter(element => element.id === placeID)[0];

    })
}

const app = new Vue({
    el: "#main-container",
    data: {
        place: null,
    }
})

getPlace();