// User clicks on the Get Activity button and a card is returned with the name of the activity shown along the top followed by accessibility (how easy it is to do), type of activity, number of people required, and the cost (from 0 to 1.0, 0 being free).
// There are three buttons, the user can get a random activity without parameters, a random activity based on the type of activity, or a random activity based on the number of people.
// A heart is also displayed on the bottom of the card for a user to like an activity and have it logged to the bottom of the page with a list of there liked activities
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const baseURL = "http://www.boredapi.com/api/activity"
const randomType = "?type="
const participantsNeeded = "?participants="

// elements needed for type button interaction
const typeResultsContainer = document.getElementById('type-container')
const typeButton = document.getElementById('type-button')
const typeSelect = document.getElementById('activity-type')


typeButton.addEventListener('click', typeButtonClicked)

function typeButtonClicked() {
fetch(baseURL + randomType + `${typeSelect.value}`)
.then(resp => resp.json())
.then(obj => {
    if (typeSelect.value === "") {
        alert('Please pick a type of activity!')
        return
    }
   typeResultsContainer.innerHTML = ""
   const newDiv = document.createElement('div')
   const newH2 = document.createElement('h2')
   const accessibility = document.createElement('p')
   const typeActivity = document.createElement('p')
   const participants = document.createElement('p')
   const price = document.createElement('p')
   const newSpan = document.createElement('span')
   
   newH2.innerText = `${obj.activity}`
   newDiv.setAttribute('id', 'card')
   accessibility.innerText = `Accessibility: ${obj.accessibility}`
   typeActivity.innerText = `Type: ${obj.type}`
   participants.innerText = `Participants: ${obj.participants}`
   price.innerText = `Price: ${obj.price}`
   newSpan.innerText = '&#x2661;'

   typeResultsContainer.appendChild(newDiv)
   newDiv.appendChild(newH2)
   newDiv.appendChild(accessibility)
   newDiv.appendChild(typeActivity)
   newDiv.appendChild(participants)
   newDiv.appendChild(price)
   newDiv.appendChild(newSpan)
        }
    )
}

// Elements for default button (center)
const defaultBtn = document.getElementById('default-button')
const defaultContainer = document.getElementById('default-container')

defaultBtn.addEventListener('click', defaultBtnClicked)

function defaultBtnClicked() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(obj => {
        defaultContainer.innerHTML = ""
        const newDiv = document.createElement('div')
        const newH2 = document.createElement('h2')
        const accessibility = document.createElement('p')
        const typeActivity = document.createElement('p')
        const participants = document.createElement('p')
        const price = document.createElement('p')
        
        newH2.innerText = `${obj.activity}`
        newDiv.setAttribute('id', 'card2')
        accessibility.innerText = `Accessibility: ${obj.accessibility}`
        typeActivity.innerText = `Type: ${obj.type}`
        participants.innerText = `Participants: ${obj.participants}`
        price.innerText = `Price: ${obj.price}`
     
        defaultContainer.appendChild(newDiv)
        newDiv.appendChild(newH2)
        newDiv.appendChild(accessibility)
        newDiv.appendChild(typeActivity)
        newDiv.appendChild(participants)
        newDiv.appendChild(price)
        }
    )
}

// Elements for number of people button
const participantsContainer = document.getElementById('participants-container')
const numberBtn = document.getElementById('people-button')
const numberOfPeople = document.getElementById('number-of-people')

numberBtn.addEventListener('click', numberButtonClicked)

function numberButtonClicked() {
fetch(baseURL + participantsNeeded + `${numberOfPeople.value}`)
.then(resp => resp.json())
.then(obj => {
    if (numberOfPeople.value === "") {
        alert('Please pick an amount of people for the activity!')
        return
    }
   participantsContainer.innerHTML = ""
   const newDiv = document.createElement('div')
   const newH2 = document.createElement('h2')
   const accessibility = document.createElement('p')
   const typeActivity = document.createElement('p')
   const participants = document.createElement('p')
   const price = document.createElement('p')
   
   newH2.innerText = `${obj.activity}`
   newDiv.setAttribute('id', 'card3')
   accessibility.innerText = `Accessibility: ${obj.accessibility}`
   typeActivity.innerText = `Type: ${obj.type}`
   participants.innerText = `Participants: ${obj.participants}`
   price.innerText = `Price: ${obj.price}`

   participantsContainer.appendChild(newDiv)
   newDiv.appendChild(newH2)
   newDiv.appendChild(accessibility)
   newDiv.appendChild(typeActivity)
   newDiv.appendChild(participants)
   newDiv.appendChild(price)
        }
    )
}
