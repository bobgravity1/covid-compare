  const guap1=document.querySelector('.guap1')
const guap2=document.querySelector('.guap2')

  const mainList=document.querySelector(".list")
  const buttonTwo=document.querySelector('.buttonTwo')
  const box4=document.querySelector('.box4')
  const comparison=document.querySelector('.comparison')
  const ordered=document.querySelector('.ordered')
  const deathsButton=document.querySelector('.deathsButton')
  const newDeathsButton=document.querySelector('.newDeathsButton')

buttonTwo.addEventListener('click', ()=>{
  deathsButton.style.visibility='visible'
})
deathsButton.addEventListener('click', ()=>{
  organized();
})


//THIS IS THE INITIAL BROAD FETCHING
const organized=async()=>{
  const res=await axios.get('https://api.covid19api.com/summary')
  
  const objArray=res.data.Countries

  function organizer(objArray, propertyName){
    return objArray.reduce((acc, obj)=>{
      let key=obj[propertyName];
      if(!acc[key]){
        acc[key]=[]
      }
      acc[key].push(obj)
      return acc
    },{})
  }
const totalDeaths=organizer(objArray,'TotalDeaths');
const totalConfirmed=organizer(objArray,'TotalConfirmed');
const newDeaths=organizer(objArray,'NewDeaths');
window.addEventListener('click', e=>{
  if(e.target===newDeathsButton){
    const newDeathsArray = Object.keys(newDeaths).map(key => {
        return newDeaths[key];
    })
        let finalArray=[]
    for(let i=0; i<newDeathsArray.length; i++){
      let final={}

      for(let j=0; j<newDeathsArray[i].length; j++){
        let deaths=newDeathsArray[i][j].NewDeaths;
        let country=newDeathsArray[i][j].Country;
        final['country']=country;
        final['deaths']=deaths;
        }
        finalArray.push(final)
      }
      const sorted=finalArray.sort((a,b)=>b.deaths>a.deaths?1:-1)
      const ul=document.createElement('ul');
      sorted.forEach(place=>{
        const li=document.createElement('li');
          li.innerHTML=`${place.country}---${place.deaths}`
          ul.appendChild(li);
          mainList.appendChild(ul);
      })
      }
    })
}
const zip=document.querySelector('.zip')




createAutoComplete({
root:document.querySelector('.container1'),
async fetchData(){
  const response=await axios.get('https://api.covid19api.com/summary')
  const objStart=response
  printCountries(objStart, document.querySelector('.box1'), guap1)
}
})

createAutoComplete({
root:document.querySelector('.container2'),
async fetchData(){
  const response=await axios.get('https://api.covid19api.com/summary')
  printCountries(response, document.querySelector('.box2'), guap2)
}
})

function runComparison(){

  const values=document.querySelectorAll('li')
    let arr=[]
  for(let words of values){

      const [letters, numbers]=words.innerHTML.split(':')
      arr.push(numbers)

  }

        leftNumbers=document.querySelectorAll('.guap1 li')
        rightNumbers=document.querySelectorAll('.guap2 li')

        leftNumbers.forEach((leftStat, index)=>{

          const rightStat = rightNumbers[index];
          const leftSideValue = parseFloat(leftStat.dataset.value);
            const rightSideValue = parseFloat(rightStat.dataset.value);
            // if (isNaN(rightSideValue) && isNaN(leftSideValue)) {
            //   leftStat.style.color="white"
            //   rightStat.style.color="white"
            // }
            if(isNaN(leftSideValue)&&isNaN(rightSideValue)){
              leftNumbers[0].style.color="pink"
              rightNumbers[0].style.color="pink"
            }
            else if(leftSideValue>rightSideValue){

              leftStat.style.color="red"
              rightStat.style.color="white"
            }

            else{
              leftStat.style.color='white'
              rightStat.style.color="red"
            }



        })
  }


function printCountries(objStart, summaryElement, side){
  const arrayGuide=objStart.data.Countries
  arrayGuide.forEach(country=>{
    const option=document.createElement('a');
    option.classList.add('dropdown-item')
    option.addEventListener('mouseover', ()=>{
      option.style.background='pink'
    })
    option.addEventListener('mouseout', ()=>{
      option.style.background='#785'
    })
    option.classList.add('hovered')
    option.innerHTML=country.Country
summaryElement.appendChild(option)
  option.addEventListener('click', ()=>{
    option.classList.add('clicked')
    showCountriesDetails(option, side);
  })
  })
}

let leftSide;
let rightSide;
showCountriesDetails=async (option, side)=>{

const title=option.innerHTML
const shit=await axios.get(`https://api.covid19api.com/country/${title}`)
  const {data}=shit
const arrayGuidez=data[data.length-1]
side.innerHTML=`<ul><li class='bigheadText'>${title} </li><li data-value='${arrayGuidez.Confirmed}' class='smallheadText'>Confirmed Cases:${arrayGuidez.Confirmed}</li>  <li data-value='${arrayGuidez.Deaths}'class='smallheadText'>Deaths: ${arrayGuidez.Deaths}</li><li data-value='${arrayGuidez.Active}'class='smallheadText'>Active Cases: ${arrayGuidez.Active}</li><li data-value='${arrayGuidez.Recovered}' class='smallheadText'>Recovered: ${arrayGuidez.Recovered}</li></ul>`
if(side===guap1){
  leftSide=shit.data;
}
if(side===guap2){
  rightSide=shit.data;
}
if(leftSide&&rightSide){
  runComparison()
}
}
