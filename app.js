const API_1 = 'https://corona.lmao.ninja/v2/all/';
const API_2 = 'https://corona.lmao.ninja/v2/countries/';




const getCovidData = async () => {

    const response = await fetch(API_1);
    if(response.status !== 200){
        throw new Error('cannot fetch the data');
    }
    const data = await response.json();
    return data;

};
getCovidData()
    .then((data) => {

        const {cases, deaths, recovered, todayCases, todayDeaths, critical, active, updated} = data;

        document.getElementById('cases').innerHTML = cases.toLocaleString();
        document.getElementById('deaths').innerHTML = deaths.toLocaleString();
        document.getElementById('recovered').innerHTML = recovered.toLocaleString();
        document.getElementById('todayCases').innerHTML = todayCases.toLocaleString();


          const date = new Date(parseInt(updated));
          const lastUpdated = date.toLocaleTimeString('ar-YE');
          document.getElementById('lastUpdated').innerHTML = lastUpdated;

          const closedCases = deaths + recovered;
          document.getElementById('deathPercentage').innerHTML = ((Number(deaths)/ Number(closedCases)) *100).toLocaleString('en', {minimumIntegerDigits: 2, maximumFractionDigits:2}) + '%';
          document.getElementById('recoveredPercentage').innerHTML = ((Number(recovered)/ Number(closedCases)) *100).toLocaleString('en', {minimumIntegerDigits: 2, maximumFractionDigits:2}) + '%';

    })

    .catch(err => console.log('rejected', err.message))

    // get countries list 

fetch(API_2).then(( response ) => {
    response.json().then((data) => {
        // console.log(data)
        if(data.length > 0){

            let countryLists = '';
            //sorting data based on the high values
            data.sort( (a, b) => b.cases - a.cases)

            data.forEach((country) => {
                countryLists += "<tr>";
                countryLists += `<td class="country">` + country.country + "</td>";
                countryLists += `<td class="cases">` + country.cases.toLocaleString() + "</td>";
                countryLists += `<td class="newcases">` + country.todayCases.toLocaleString() + "</td>";
                countryLists += `<td class="deaths">` + country.deaths.toLocaleString() + "</td>";
                countryLists += `<td class="newDeaths">` + country.todayDeaths.toLocaleString() + "</td>";
                countryLists += `<td class="recovered">` + country.recovered.toLocaleString() + "</td>";
                countryLists += "<td>" + country.critical.toLocaleString()+ "</td>";
                countryLists += "<td>" + country.tests.toLocaleString() + "</td> </tr>" ;
            })
            document.getElementById('dataSet').innerHTML = countryLists;
            
        } 
    })

}).catch(err => console.log('rejected', err.message))

//fillter search

function filterSearch() {
    // Declare variables
    var input, filter, table_1, tr, td, i, txtValue;
    input = document.getElementById("searchForm");
    filter = input.value.toUpperCase();
    table = document.getElementById("table_1");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
