// User clicks on the Get Activity button and a card is returned with the name of the activity shown along the top followed by accessibility (how easy it is to do), type of activity, number of people required, and the cost (from 0 to 1.0, 0 being free).
// There are three buttons, the user can get a random activity without parameters, a random activity based on the type of activity, or a random activity based on the number of people.
// A heart is also displayed on the bottom of the card for a user to like an activity and have it logged to the bottom of the page with a list of their liked activities
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const baseURL = "http://www.boredapi.com/api/activity"
const randomType = "?type="
const participantsNeeded = "?participants="

const baseCard = document.getElementById('emptyCard')

// elements needed for type button interaction
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
        const container = document.getElementById('type-container')
        reset(container)
        const newDiv = document.createElement('div')
        innerNewDiv(newDiv, obj.activity, obj.accessibility, obj.type, obj.participants, obj.price)
        const pTag = document.createElement('p')
        const span = document.createElement('span')
    
        newDiv.setAttribute('id', 'card')
        span.innerText = EMPTY_HEART
        span.setAttribute('id', 'like-glyph1')

        container.appendChild(newDiv)
        newDiv.appendChild(pTag)
        pTag.appendChild(span)

        span.addEventListener('click', () => heartClicked(span, obj.activity) )
            }
        )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
            }
        )
    }


// Elements for default button (center)
const defaultBtn = document.getElementById('default-button')

defaultBtn.addEventListener('click', defaultBtnClicked)

function defaultBtnClicked() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(obj => {
        const container = document.getElementById('default-container')
        reset(container)
        const newDiv = document.createElement('div')
        innerNewDiv(newDiv, obj.activity, obj.accessibility, obj.type, obj.participants, obj.price)
        const pTag = document.createElement('p')
        const span = document.createElement('span')
        
        newDiv.setAttribute('id', 'card2')
        span.innerText = EMPTY_HEART
        span.setAttribute('id', 'like-glyph2')
     
        container.appendChild(newDiv)
        newDiv.appendChild(pTag)
        pTag.appendChild(span)
     
        span.addEventListener('click', () => heartClicked(span, obj.activity))
        }
    )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
        }
    )
}         


// Elements for number of people button
const numberBtn = document.getElementById('people-button')
const selectParticipants = document.getElementById('number-of-people')

numberBtn.addEventListener('click', numberButtonClicked)

function numberButtonClicked() {
    fetch(baseURL + participantsNeeded + `${selectParticipants.value}`)
    .then(resp => resp.json())
    .then(obj => {
        if (selectParticipants.value === "") {
            alert('Please pick an amount of people for the activity!')
            return
        }
            const container = document.getElementById('participants-container')
            reset(container)
            const newDiv = document.createElement('div')
            innerNewDiv(newDiv, obj.activity, obj.accessibility, obj.type, obj.participants, obj.price)
            const pTag = document.createElement('p')
            const span = document.createElement('span')

            newDiv.setAttribute('id', 'card3')
            span.innerText = EMPTY_HEART
            span.setAttribute('id', 'like-glyph3')
            
            container.appendChild(newDiv)
            newDiv.appendChild(pTag)
            pTag.appendChild(span)

            span.addEventListener('click', () => heartClicked(span, obj.activity))
        }
    )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
        }
    )
}

function innerNewDiv (newDiv, activity, accessibility, type, participants, price) {
    newDiv.innerHTML = 
   `<h3>${activity}</h3>
    <p>Accessibility: ${accessibility} </p>
    <p>Type: ${type} </p>
    <p>Participants: ${participants} </p>
    <p>Price: ${price}</p>`
}

function heartClicked(span, activity) {
    const likeList = document.getElementById('listed-activities')
 
     if (span.innerText === EMPTY_HEART) {
     span.innerText = FULL_HEART
     span.classList.add('activated-heart')
     const newP = document.createElement('p')
     newP.innerText = activity
     newP.classList.add('liked')
     likeList.append(newP)
 
     } else {
      span.innerText = EMPTY_HEART
      span.classList.remove('activated-heart')
      const liked = document.querySelectorAll('.liked')
      liked.forEach(element => {
          if (element.innerText === activity) {
              element.remove()
                 }  
             }
         )
     }
 }

 function reset(container) {
    baseCard.remove() 
   container.innerHTML = ""
}