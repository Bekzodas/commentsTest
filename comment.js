const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
  keyboard: false,
});

const myPutModal = new bootstrap.Modal(
  document.getElementById("exampleModalPut"),
  {
    keyboard: false,
  }
);

let loading = document.getElementById("loading");
let error = document.getElementById("error");
error.style.display = "none";
let table = document.getElementsByTagName("table")[0];
table.style.display = "none";
let tbody = document.getElementsByTagName("tbody")[0];

let url = "https://jsonplaceholder.typicode.com/comments";
let inputNewYes;

let exampleModalLabel = document.getElementById("exampleModalLabel");
exampleModalLabel.innerHTML = " Post Ucer";

let exampleModalLabelPut = document.getElementById("exampleModalLabelPut");
exampleModalLabelPut.innerHTML = "Put Ucer";

// start
let getUcers = async () => {
  try {
    let respons = await axios.get(url);
    return { seccess: true, data: respons.data };
  } catch (error) {
    console.log("error :" + error);
    return { seccess: false, data: [] };
  }
};

let setUcers = async () => {
  let respons = await getUcers();
  loading.style.display = "none";

  if (respons.seccess) {
    table.style.display = "";

    respons.data.map((item, index) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.id}</td>
      <td class="text-primary fw-bold">${item.name}</td>
      
      <td>${item.email}</td>
      <td class="w-25 fw-bold text-primary">${item.body}</td>
      <td class=" gap-2 d-flex pb-5">
        <button class="btn btn-primary mt-5" onclick="putData(${item.id})">
          <i class="fas fa-edit"></i>
        </button>
  
        <button class="btn btn-danger mt-5" onclick="dalateData(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    error.style.display = "";
  }
};

setUcers();

let sevaDate = async () => {
  myModal.show();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let comment = document.getElementById("comment").value;

  let inputNewValue = {
    name: name,
    email: email,
    comment: comment,
  };

  let respons = await postData(inputNewValue);

  if (respons.sacces) {
    openModal(inputNewValue);
    clearInput();
    alert("qoshildi");
    myModal.hide();
  } else {
    alert("hatolik");
  }
};

let openModal = () => {
  myModal.show();
};

let clearInput = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("comment").value = "";
};

let postData = async (inputValue) => {
  try {
    let res = await axios.post(url, inputValue);
    console.log(inputValue);
    return { sacces: true, data: res.data };
  } catch (error) {
    console.log("eroror = " + error);
    return { sacces: false, data: [] };
  }
};

let putData = async (id) => {
  try {
    let respons = await axios.get(url + "/" + id);

    console.log(respons.data);
    inputNewYes = respons.data;
    document.getElementById("namePut").value = inputNewYes.name;
    document.getElementById("emailPut").value = inputNewYes.email;
    document.getElementById("commentPut").value = inputNewYes.body;
    myPutModal.show();
  } catch (error) {
    console.log("error :" + error);
    return { success: false, data: [] };
  }
};

let newPut = async () => {
  inputNewYes.name = document.getElementById("namePut").value;
  inputNewYes.email = document.getElementById("emailPut").value;
  inputNewYes.body = document.getElementById("commentPut").value;
  console.log(inputNewYes);
  inportNewData();
  myPutModal.hide();
};

let inportNewData = async () => {
  try {
    await axios.put(url + "/" + inputNewYes.id, inputNewYes);
    return { sacces: true, data: res.data };
  } catch (error) {
    console.log("eroror = " + error);
    return { sacces: false, data: [] };
  }
};

let dalateData = async (id) => {
  try {
    console.log("ochirildi");
    await axios.delete(url + "/" + id);
    return { sacces: true, data: res.data };
  } catch (error) {
    console.log("eroror = " + error);
    return { sacces: false, data: [] };
  }
};
