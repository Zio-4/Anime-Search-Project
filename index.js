// User clicks on the Get Activity button and a card is returned with the name of the activity shown along the top followed by accessibility (how easy it is to do), type of activity, number of people required, and the cost (from 0 to 1.0, 0 being free).
// There are three buttons, the user can get a random activity without parameters, a random activity based on the type of activity, or a random activity based on the number of people.
// A heart is also displayed on the bottom of the card for a user to like an activity and have it logged to the bottom of the page with a list of their liked activities
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const baseURL = "http://www.boredapi.com/api/activity"
const randomType = "?type="
const participantsNeeded = "?participants="

const baseCard = document.getElementById('emptyCard')

// elements/EventListener for type button interaction
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
        let i = "0", j = "0"
        renderCard(container, obj, i, j)
            }
        )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
            }
        )
    }

// elements/EventListener for default button interaction
const defaultBtn = document.getElementById('default-button')
defaultBtn.addEventListener('click', defaultBtnClicked)

function defaultBtnClicked() {
    fetch(baseURL)
    .then(resp => resp.json())
    .then(obj => {
        const container = document.getElementById('default-container')
        let i = "1", j = "1"
        renderCard(container, obj, i, j)
        }
    )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
        }
    )
}         

// elements/EventListener for participants button interaction
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
            let i = "2", j = "2"
            renderCard(container, obj, i, j)
        }
    )
    .catch(error => {
        alert("There was a problem getting the data!")
        console.log(error.message);
        }
    )
}

// Callback functions for rendering cards and listing liked activities
function renderCard(container, obj, i, j) {
    baseCard.remove() 
    container.innerHTML = ""
    const {activity, accessibility, type, participants, price} = obj
    const newDiv = document.createElement('div')
    newDiv.innerHTML = 
        `<h3>${activity}</h3>
        <p>Accessibility: ${accessibility} </p>
        <p>Type: ${type} </p>
        <p>Participants: ${participants} </p>
        <p>Price: ${price}</p>`
    const pTag = document.createElement('p')
    const span = document.createElement('span')
    span.innerText = EMPTY_HEART
    
    i++
    j++
    newDiv.setAttribute('id', `card${i}`)
    span.setAttribute('id', `like-glyph${j}`)

    
    container.appendChild(newDiv)
    newDiv.appendChild(pTag)
    pTag.appendChild(span)

    span.addEventListener('click', () => heartClicked(span, activity) )

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
