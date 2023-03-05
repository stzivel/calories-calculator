// andres: 66 + 13.7 * varos + 5 * ypsos - 6.8 * ilikia - default thermides xwris kamia drastiriotita
// gynaikes : 655 + 9.6 * varos + 1.8 * ypsos - 4.7 * ilikia

//syntelestes  drastiriotitas: a : * 1.2, b: * 1.3, c : * 1.5  d : * 1.7

//thermidiko elleima 20% : thermides sintirisis * 20% - to noumero pou prokyptei to aferw apo tis parapanw thermides
//thermidiko pleonasma : thermides diatirisis + 200 thermides

class Data {
  constructor(age, gender, height, weight, activity) {
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.activity = activity;
  }
}

const form = document.querySelector("#input-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const age = document.querySelector("#age").value;

  const radios = document.querySelectorAll('input[name = "gender"]');

  const height = document.querySelector("#height").value;

  const weight = document.querySelector("#weight").value;

  const activity = document.querySelector(".form-select").value;

  let gender;

  for (const radio of radios) {
    if (radio.checked) {
      gender = radio.value;
      break;
    }
  }

  const data = new Data(age, gender, height, weight, activity);

  const defCal = defaultCalories(data);

  const mainCal = maintenanceCalories(defCal, data);

  const deficitCal = deficitCalories(mainCal);

  const bulkCal = parseInt(mainCal) + 200;

  form.remove();

  const results = document.querySelector("#results");

  const row = document.createElement("h3");

  row.innerHTML = `
    Default Calories: ${defCal} <br>
    Maintenance Calories: ${mainCal} <br>
    Deficit Calories: ${deficitCal} <br>
    Bulk Calories: ${bulkCal} <br>

    <button type="submit" class="btn btn-primary mt-4 recalc-btn">Recalculate</button>
`;
  results.appendChild(row);

  results.addEventListener("click", (e) => {
    e.preventDefault();
    results.remove();
    window.location.reload();
  });
});

function defaultCalories(data1) {
  let defaultCal;

  switch (data1.gender) {
    case "male":
      defaultCal =
        66 + 13.7 * data1.weight + 5 * data1.height - 6.8 * data1.age;
      break;
    case "female":
      defaultCal =
        665 + 9.6 * data1.weight + 1.8 * data1.height - 4.7 * data1.age;
      break;
    default:
  }

  return defaultCal.toFixed(0);
}

function maintenanceCalories(defaultCal, data1) {
  let maintenanceCal;

  switch (data1.activity) {
    case "a":
      maintenanceCal = defaultCal * 1.2;
      break;
    case "b":
      maintenanceCal = defaultCal * 1.3;
      break;
    case "c":
      maintenanceCal = defaultCal * 1.5;
      break;
    case "d":
      maintenanceCal = defaultCal * 1.7;
      break;
    default:
  }

  return maintenanceCal.toFixed(0);
}

function deficitCalories(maintenanceCal) {
  let deficitCal = maintenanceCal * 0.2;

  return (maintenanceCal - deficitCal).toFixed(0);
}
