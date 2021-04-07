'use strict'

let spellsArray = [];
let spellsObj = {}
let spellParentElement = document.getElementById('spell');

let spellNameParentElement = document.getElementById('spellName');
let castingTimeParentElement = document.getElementById('castingTime');
let rangeParentElement = document.getElementById('range');
let componentsParentElement = document.getElementById('components');
let durationParentElement = document.getElementById('duration');
let descriptionParentElement = document.getElementById('description');

let form = document.getElementById('form');

//this function populates the State Names array used in the autocomplete function
async function getSpellName() {
  const response = await fetch('https://www.dnd5eapi.co/api/spells');
  const data = await response.json();
  for (let i = 0; i < data.results.length; i++) {
    spellsArray.push(data.results[i].name);
    spellsObj[data.results[i].name] = {
      spellIndex: data.results[i].index,
      spellName: data.results[i].name,
      spellURL: data.results[i].url
    }
  }
};
getSpellName();


//this function puts together the object with all the information needed to display on the page
async function getData(e) {
  e.preventDefault();
  const name = e.target.myCountry.value
  spellParentElement.innerHTML = '';
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellsObj[name].spellIndex}`);
  const data = await response.json();
  console.log(data)

  //name
  let spellName = document.createElement('p');
  spellName.textContent = `${spellsObj[name].spellName}`;
  spellNameParentElement.appendChild(spellName);

  //casting time
  let castingTime = document.createElement('p');
  castingTime.textContent = `${data.casting_time}`;
  castingTimeParentElement.appendChild(castingTime);

  //range
  let range = document.createElement('p');
  range.textContent = `${data.range}`;
  rangeParentElement.appendChild(range);

  //components
  let components = document.createElement('p');
  components.textContent = `${data.components}`;
  componentsParentElement.appendChild(components);

  //duration
  let duration = document.createElement('p');
  duration.textContent = `${data.duration}`;
  durationParentElement.appendChild(duration);

  //description  desc
  let desc = document.createElement('p');
  desc.textContent = `${data.desc[0]} ${data.desc[1]}`;
  descriptionParentElement.appendChild(desc);

  // //link
  // let link = document.createElement('a');
  // link.setAttribute('href', `https://www.dnd5eapi.co/api/spells/${spellsObj[name].spellIndex}`);
  // link.innerHTML = 'Click Here for More info about ' + spellsObj[name].spellName;
  // spellParentElement.appendChild(link);


};


form.addEventListener('submit', getData);


//this function creates the autocomplete functionality on the page
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("myInput"), spellsArray);