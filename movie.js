const moviesLSKey = 'movies'

// state available to my entire app
/* Model */
let moviesModel = []


const formEl = document.querySelector('form');
const tBodyEl = document.querySelector('tbody')

let prepareCounter = (counter) => () => {
  counter = counter + 1;
  return counter;
}

let getNextCount = prepareCounter(0);
let getNewId = () => {
    let timestamp = Number(Date.now())
    return Number(
        getNextCount() + '.' + timestamp
    )
}

let moviesRaw = localStorage.getItem('movies')
let savedMovies
try {
    savedMovies = JSON.parse(moviesRaw) || [];
} catch( e ) {
    savedMovies = []
}



 /**

  Think about what you want inside out.

  What you want is:
  - a table body that has a new tr 
  - the new tr new tds 
  - the tds have content

  Inside out its
  - make tds
  - add text to tds
  - make tr
  - add td to tr
  -  add tr to existing td

  Text neeeds to be added to TD
  TDs THEN need to be attached to TR
  AFTER DOING THAT
  TR needs o be attaced to TD


  **/
 




$(formEl).submit(formSubmitHandler);
// document.addEventListener('DOMContentLoaded',init);
$(document).ready(init)

/* Controller */

function updateLSAndRender( ) {
    setLS(moviesLSKey,moviesModel)
    clearTable()
    renderList(moviesModel)
}

function deleteHandler() {
    let id = Number(event.target.parentElement.parentElement.dataset.id)
    console.log({id})
    moviesModel = moviesModel.filter( (item) => {
        // console.log(item)
        return item.id !== id 
    })
    updateLSAndRender()
}


function formSubmitHandler(event) {
    event.preventDefault();
    const movieRanked = $('input:eq(0)').val();
    const ranking = $('input:eq(1)').val();
    moviesModel.push({
        id: getNextCount(),
        movieRanked,
        ranking
    })
    updateLSAndRender()
    this.reset()
}



function init (event) {
    // hydrate the model data
    moviesModel = getMoviesFromLS(moviesLSKey)
    renderList(moviesModel)
}


function getMoviesFromLS(key) {
    return getLS(key,[])
}

// interface between the user, the raw data, and view

/*

This function will take a list of type object that has this structure

interface {
    movieRanked: string
    ranking: number
}
and it will render it to our HTML document
*/

function clearTable() {
    tBodyEl.innerHTML = ''
}

function renderList(list) {
    console.log({list})
    for( let { id, movieRanked, ranking } of list ) {
        console.log('hey')
        let tr = getNewRow(id, movieRanked,ranking)
        tBodyEl.append(tr)
    }
}




/* View / render */
// take the raw data and make a UI
function getNewRow( id, title, rating ) {

    // make TD's
    const tdTitle = document.createElement('td');
    const tdRating = document.createElement('td');
    const tdButton = document.createElement('td');
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click',deleteHandler)
    tdButton.append(deleteButton)
    tdTitle.innerText = title;
    tdRating.innerText = rating;
    // Make TR
    const tr = document.createElement('tr');
    tr.dataset.id = id
   
    tr.append(tdTitle,tdRating,tdButton);
    return tr
}

// function createRecord(title, rating) {

//     // make TD's
//     const tdTitle = document.createElement('td');
//     const tdRating = document.createElement('td');
//     const tdButton = document.createElement('td');
//     const submitButton = document.createElement('button')
//     submitButton.innerText = 'Delete';
//     tdButton.append(submitButton)
//     tdTitle.innerText = title;
//     tdRating.innerText = rating;
//     // Make TR
//     const tr = document.createElement('tr');
//     tr.setAttribute('id',getCounter(0))
   
//     tr.append(tdTitle,tdRating,tdButton);
//     tBodyEl.append(tr)
  
//     submitButton.addEventListener('click', function() {
  
//       return this.parentNode.parentNode.remove();
//       // console.log(button.parentelement)
//     })
  
//     savedMovies.push({movieRanked: tdTitle.innerText, ranking: tdRating.innerText })
//     localStorage.setItem('movies', JSON.stringify(savedMovies));
  
//   }
  



















/* Helpers */

function getLS(key, defaultValue = {} ) {
    let rawValue = localStorage.getItem(key)
    let json
   // Kelvin's version
   if (rawValue instanceof Object) {
    json = JSON.parse(rawValue)
  } else {
    json = defaultValue 
  }



    // try {
    //     json = JSON.parse(rawValue) || defaultValue
    // } catch (e ) {
    //     json = defaultValue
    // }
    return json
}




function setLS(key,obj) {
    let stringifiedObject = JSON.stringify(obj)
    localStorage.setItem(key,stringifiedObject)
}

