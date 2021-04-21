'use strict'

let spellsArray = [];
let spellsObj = {};
let tempArr = [];
let spellParentElement = document.getElementById('spell');

let spellNameParentElement = document.getElementById('spellName');
let damageTypeParentElement = document.getElementById('damageType');
let damageParentElement = document.getElementById('damage');
let lvlNameParentElement = document.getElementById('lvl');
let castingTimeParentElement = document.getElementById('castingTime');
let rangeParentElement = document.getElementById('range');
let AOEParentElement = document.getElementById('AOE');
let componentsParentElement = document.getElementById('components');
let matParentElement = document.getElementById('mat');
let durationParentElement = document.getElementById('duration');
let concentrationParentElement = document.getElementById('concentration');
let schoolParentElement = document.getElementById('school');
let ritualParentElement = document.getElementById('ritual');
let classesParentElement = document.getElementById('classes');
let healParentElement = document.getElementById('healing');
let descriptionParentElement = document.getElementById('description');

let noteParentElement = document.getElementById('note');
let noteFormParentElement = document.getElementById('noteForm');
let noteFormDivParentElement = document.getElementById('noteFormDiv');

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
  const name = e.target.myCountry.value;
  tempArr = [];
  tempArr.push(name);
  spellParentElement.innerHTML = '';
  const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellsObj[name].spellIndex}`);
  const data = await response.json();
  console.log(data)

  //notes

  noteParentElement.className = "card";
  noteFormDivParentElement.className = "card";

  let storedNotes = localStorage.getItem(name);
  let parseNotes = JSON.parse(storedNotes);
  noteParentElement.innerHTML = '';
  let clearNote = document.createElement('h2');
  clearNote.textContent = 'My Notes: ';
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = "delete This Note";
  let note = document.createElement('p');
  note.textContent = parseNotes;
  noteParentElement.appendChild(clearNote);
  noteParentElement.appendChild(note);
  noteParentElement.appendChild(deleteButton);

  //name
  spellNameParentElement.innerHTML = '';
  let clearspellName = document.createElement('h2');
  clearspellName.textContent = 'Spell Name: ';
  let spellName = document.createElement('p');
  spellName.textContent = `${spellsObj[name].spellName}`;
  spellNameParentElement.appendChild(clearspellName);
  spellNameParentElement.appendChild(spellName);

  //damage Type
  damageTypeParentElement.innerHTML = '';
  let clearDamageType = document.createElement('h3');
  clearDamageType.textContent = 'Damage Type: ';
  damageTypeParentElement.appendChild(clearDamageType);
  if (data.damage) {
    let damageType = document.createElement('p');
    damageType.textContent = `${data.damage.damage_type.name}`;
    damageTypeParentElement.appendChild(damageType);
  } else {
    let damageType = document.createElement('p');
    damageType.textContent = `N/A`;
    damageTypeParentElement.appendChild(damageType);
  }

  //damage
  damageParentElement.innerHTML = '';
  let clearDamage = document.createElement('h3');
  clearDamage.textContent = 'Damage: ';
  damageParentElement.appendChild(clearDamage);
  if (!data.damage) {
    let damage = document.createElement('p');
    damage.textContent = `N/A`;
    damageParentElement.appendChild(damage);
  } else if (data.damage.damage_at_slot_level) {
    let damageObj = data.damage.damage_at_slot_level;
    for (let i in damageObj) {
      this['level' + i] = document.createElement('p');
      this['level' + i].textContent = `Spell Slot Level ${i}: ${damageObj[i]}`;
      damageParentElement.appendChild(this['level' + i]);
    }
  } else if (data.damage.damage_at_character_level) {
    let damageObj = data.damage.damage_at_character_level;
    for (let i in damageObj) {
      this['level' + i] = document.createElement('p');
      this['level' + i].textContent = `Character Level ${i}: ${damageObj[i]}`;
      damageParentElement.appendChild(this['level' + i]);
    }
  }

  //lvl
  lvlNameParentElement.innerHTML = '';
  let clearLvl = document.createElement('h3');
  clearLvl.textContent = 'Spell Level: ';
  let lvl = document.createElement('p');
  lvl.textContent = `${data.level}`;
  lvlNameParentElement.appendChild(clearLvl);
  lvlNameParentElement.appendChild(lvl);

  //casting time
  castingTimeParentElement.innerHTML = '';
  let clearCastingTime = document.createElement('h3');
  clearCastingTime.textContent = 'Casting Time: ';
  let castingTime = document.createElement('p');
  castingTime.textContent = `${data.casting_time}`;
  castingTimeParentElement.appendChild(clearCastingTime);
  castingTimeParentElement.appendChild(castingTime);

  //range
  rangeParentElement.innerHTML = '';
  let clearRange = document.createElement('h3');
  clearRange.textContent = 'Range: ';
  let range = document.createElement('p');
  range.textContent = `${data.range}`;
  rangeParentElement.appendChild(clearRange);
  rangeParentElement.appendChild(range);

  //AOE
  AOEParentElement.innerHTML = '';
  let clearAOE = document.createElement('h3');
  clearAOE.textContent = 'Area Of Effect: ';
  AOEParentElement.appendChild(clearAOE);
  if (data.area_of_effect) {
    let AOE = document.createElement('p');
    let AOEsize = document.createElement('p')
    AOE.textContent = `Type: ${data.area_of_effect.type}`;
    AOEsize.textContent = `Size: ${data.area_of_effect.size}`
    AOEParentElement.appendChild(AOE);
    AOEParentElement.appendChild(AOEsize);
  } else {
    let AOE = document.createElement('p')
    AOE.textContent = `N/A`;
    AOEParentElement.appendChild(AOE);
  }


  //components
  componentsParentElement.innerHTML = '';
  let clearComponents = document.createElement('h3');
  clearComponents.textContent = 'Components: ';
  let components = document.createElement('p');
  components.textContent = `${data.components}`;
  componentsParentElement.appendChild(clearComponents);
  componentsParentElement.appendChild(components);

  //material mat
  matParentElement.innerHTML = '';
  let clearMat = document.createElement('h3');
  clearMat.textContent = 'Materials: ';
  matParentElement.appendChild(clearMat);
  if (data.material) {
    let mat = document.createElement('p');
    mat.textContent = `${data.material}`;
    matParentElement.appendChild(mat);
  } else {
    let mat = document.createElement('p');
    mat.textContent = `N/A`;
    matParentElement.appendChild(mat);
  }

  //duration
  durationParentElement.innerHTML = '';
  let clearDur = document.createElement('h3');
  clearDur.textContent = 'Duration: ';
  let duration = document.createElement('p');
  duration.textContent = `${data.duration}`;
  durationParentElement.appendChild(clearDur);
  durationParentElement.appendChild(duration);

  //concentration
  concentrationParentElement.innerHTML = '';
  let clearConcentration = document.createElement('h3');
  clearConcentration.textContent = 'Concentration: ';
  let concentration = document.createElement('p');
  concentration.textContent = `${data.concentration}`;
  concentrationParentElement.appendChild(clearConcentration);
  concentrationParentElement.appendChild(concentration);

  //school
  schoolParentElement.innerHTML = '';
  let clearSchool = document.createElement('h3');
  clearSchool.textContent = 'School: ';
  let school = document.createElement('p');
  school.textContent = `${data.school.name}`;
  schoolParentElement.appendChild(clearSchool);
  schoolParentElement.appendChild(school);

  //ritual
  ritualParentElement.innerHTML = '';
  let clearRitual = document.createElement('h3');
  clearRitual.textContent = 'Ritual: ';
  let ritual = document.createElement('p');
  ritual.textContent = `${data.ritual}`;
  ritualParentElement.appendChild(clearRitual);
  ritualParentElement.appendChild(ritual);


  //classes
  let classStr = '';
  classesParentElement.innerHTML = '';
  let clearClasses = document.createElement('h3');
  clearClasses.textContent = 'Classes: ';
  classesParentElement.appendChild(clearClasses);
  let classes = document.createElement('p');
  for (let i = 0; i < data.classes.length; i++) {
    if (i !== data.classes.length - 1) {
      classStr = classStr + ` ${data.classes[i].name},`
    } else {
      classStr = classStr + ` ${data.classes[i].name}`
    }

  };
  classes.textContent = classStr;
  classesParentElement.appendChild(classes);


  //healing
  healParentElement.innerHTML = '';
  let clearHeal = document.createElement('h3');
  clearHeal.textContent = 'Healing: ';
  healParentElement.appendChild(clearHeal);
  if (!data.heal_at_slot_level) {
    let heal = document.createElement('p');
    heal.textContent = `N/A`;
    healParentElement.appendChild(heal);
  } else {
    let healObj = data.heal_at_slot_level;
    for (let i in healObj) {
      this['level' + i] = document.createElement('p');
      this['level' + i].textContent = `Slot Level ${i}: ${healObj[i]}`;
      healParentElement.appendChild(this['level' + i]);
    }
  }


  //description  desc
  let descStr = '';
  descriptionParentElement.innerHTML = '';
  let clearDesc = document.createElement('h3');
  clearDesc.textContent = 'Description: ';
  let desc = document.createElement('p');
  descriptionParentElement.appendChild(clearDesc);
  for (let i = 0; i < data.desc.length; i++) {
    descStr = descStr + ` ${data.desc[i]}`
  };
  if (data.higher_level) {
    let higherLevel = ' At Higher Levels: ';
    descStr = descStr + higherLevel;
    for (let j = 0; j < data.higher_level.length; j++) {
      descStr = descStr + data.higher_level[j];
    }
  }
  desc.textContent = descStr;
  descriptionParentElement.appendChild(desc);

};



function storeNotes(event) {
  //stores the notes created in the loval storage
  event.preventDefault();
  let existing = localStorage.getItem(tempArr[0]);
  let spellNote = event.target.noteInput.value;

  //checks to see if there is already a note under that spell, if so it adds to it
  let adding = existing ? `${existing.replace(/['"]+/g, '')}. ${spellNote}` : spellNote;
  let jsonSpellNote = JSON.stringify(adding);
  console.log(jsonSpellNote)
  localStorage.setItem(tempArr[0], jsonSpellNote);
  noteFormParentElement.reset();

  //adds the notes created to the notes card immedietly
  noteParentElement.innerHTML = "";
  let storedNotes = localStorage.getItem(tempArr[0]);
  let parseNotes = JSON.parse(storedNotes);
  let note = document.createElement('p');
  note.textContent = parseNotes;
  let clearNote = document.createElement('h2');
  clearNote.textContent = 'My Notes: ';
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = "delete This Note";
  noteParentElement.appendChild(clearNote);
  noteParentElement.appendChild(note);
  noteParentElement.appendChild(deleteButton);
};


function deleteNote(e) {
  e.preventDefault();
  localStorage.removeItem(tempArr[0]);
  noteParentElement.innerHTML = "";
  let clearNote = document.createElement('h2');
  clearNote.textContent = 'My Notes: ';
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = "delete This Note";
  noteParentElement.appendChild(clearNote);
  noteParentElement.appendChild(deleteButton);
}

// event listeners
form.addEventListener('submit', getData);
noteFormParentElement.addEventListener('submit', storeNotes);
noteParentElement.addEventListener('submit', deleteNote);



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