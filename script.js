// Instantiate Chance so it can be used
var chance = new Chance();
var tableItems = 85/2;
var count = 0;
var playerPositions;
var myChart;

const url = "https://api.collegefootballdata.com/roster?team=Georgia%20Tech&year=2020";

const options = {
  headers: {
    Accept: "application/json",
    Authorization: "Bearer xP9XIFuDijTk8ea3QiDWLylNbQu/c0O91ZY8AKQmL56Xvp19/6YjWvkGYJVhO3fu"
  }
};

fetch(url, options)
  .then(res => console.log(res.json()))
  .then(data => console.log(data));

var OFF_POSITION_LIST = ["QB","RB","WR","FB","C","RG","LG","RT","LT","TE"]
var YEAR = ["Freshman","RS Freshman","Sophmore","RS Sophmore","Junior","RS Junior","Senior","RS Senior"]
var HEIGHT = ["5'6","5'7","5'8","5'9","5'10","5'11","6'0","6'1","6'2","6'3","6'4","6'5","6'6","6'7"]
var PRO = [4,4,6,3,4,4,4,5,5,4]
var SPREAD = [4,5,8,0,4,4,4,5,5,4]
var OPTION = [5,7,5,4,4,5,5,4,4,0]

main()
buildChart(PRO)
document.getElementById("btn").addEventListener("click",main)
document.getElementById("btn").addEventListener("click",function(){buildChart(PRO)});
document.getElementById("btnPro").addEventListener("click",function(){buildChart(PRO)});
document.getElementById("btnSpread").addEventListener("click",function(){buildChart(SPREAD)});
document.getElementById("btnOption").addEventListener("click",function(){buildChart(OPTION)});

function main() {
  //Creates object blueprint for data
  const playerData = () => {
    return {
      name: chance.name({ gender: 'male' }),
      position: OFF_POSITION_LIST[chance.integer({min: 0, max: 9 })],
      state: chance.state(),
      year: YEAR[chance.integer({min: 0, max:7 })],
      height: HEIGHT[chance.integer({min: 0, max:13 })],
      weight: chance.integer({min: 160, max:375 }),
      favNumber: chance.integer({min: 1, max:99 })
    }
  }
  // Generates "TABLESIZE" instances of personData to populate the table
  const tableData = Array.from({length:`${tableItems}`},playerData)

  document.getElementById("tableResults").innerHTML = ""

  tableData.forEach(function(item) {
  document.getElementById("tableResults").innerHTML += `
   <tr>
        <td><img src="assets/faces/${Math.floor(Math.random() * 63) + 1}.jpg" width="35"></td>
        <td>${item.name}</td>
        <td>${item.position}</td>
        <td>${item.state}</td>
        <td>${item.year}</td>
        <td>${item.height}</td>
        <td>${item.weight}</td>
        <td>${item.favNumber}</td>
      </tr>
    `
  })

  playerPositions = [0,0,0,0,0,0,0,0,0,0]

  tableData.forEach(function(item) {
    if (item.position == "QB") {
      playerPositions[0] += 1
    } else if (item.position == "RB") {
      playerPositions[1]++
    } else if (item.position == "WR") {
      playerPositions[2]++
    } else if (item.position == "FB") {
      playerPositions[3]++
    } else if (item.position == "C") {
      playerPositions[4]++
    } else if (item.position == "RG") {
      playerPositions[5]++
    } else if (item.position == "LG") {
      playerPositions[6]++
    } else if (item.position == "RT") {
      playerPositions[7]++
    } else if (item.position == "LT") {
      playerPositions[8]++
    } else if (item.position == "TE") {
      playerPositions[9]++
    }
  })
} 

function buildChart(idealRoster) {
  if (myChart != null) {
    myChart.destroy()
  }
  // INSERT GRAPH STUFF
  const data = {
    labels: OFF_POSITION_LIST,
    datasets: [{
      label: 'Current Roster',
      data: playerPositions,
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Ideal Roster',
      data: idealRoster,
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },
  };
  myChart = new Chart(document.getElementById('myChart'),config)
}


$.ajax({
        url: 'https://api.collegefootballdata.com/roster?team=Georgia%20Tech&year=2020',
        beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer xP9XIFuDijTk8ea3QiDWLylNbQu/c0O91ZY8AKQmL56Xvp19/6YjWvkGYJVhO3fu")
        }, success: function(data){
          console.log(data)
            alert(data);
            //process the JSON data etc
        }
        
})

