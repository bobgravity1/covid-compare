

  const createAutoComplete=({root, printPlaces, printPlacesDetails, fetchData})=>{
  root.innerHTML=`  <div>
        <span class="icon"><i class="fa fa-search"></i></span>
        <input style="color:white"class='input' type="search" id="search" placeholder="Search..." />

        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Regular link</a>
          <a class="dropdown-item active" href="#">Active link</a>
          <a class="dropdown-item" href="#">Another link</a>
        </div>
        <div class='summary'>
        </div>
    </div>`

    const input=document.querySelector('.input')
    const menu=document.querySelector('.dropdown-menu')
    const button=document.querySelector('.buttonOne')
      const buttonTwo=document.querySelector('.buttonTwo')



// function printCountries(objStart){
//   const arrayGuide=objStart.data.Countries
//   arrayGuide.forEach(country=>{
//     const option=document.createElement('a');
//     option.classList.add('dropdown-item')
//     option.classList.add('hovered')
//     option.innerHTML=country.Country
// box.appendChild(option)
//   option.addEventListener('click', ()=>{
//     printPlaceDetails(option);
//   })
//   })
// }
function showCountries(objStart, summaryElement, side){
  const arrayGuide=objStart.data.Countries
  arrayGuide.forEach(country=>{
    const option=document.createElement('a');
    option.classList.add('dropdown-item')
    option.classList.add('hovered')
    option.innerHTML=country.Country
summaryElement.appendChild(option)
  option.addEventListener('click', ()=>{
    showCountriesDetails(option, side);
  })
  })
}

button.addEventListener('click', event=>{
  fetchData();
})
}
