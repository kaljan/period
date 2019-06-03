
var currRow = null;

var table = new Tabulator("#container", {
  height: "311px",
  selectable:true,
  columns: [
    { title: "Number", field: "number", sorter: "number" },
    { title: "Abbreviation", field: "abbreviation", width: 150, editor: "input", validator: "required" },
    { title: "Name", field: "name", width: 150, editor: "input", validator: "required" },
    { title: "Atomic mass", field: "atomic_mass", sorter: "number", editor: "input", validator: "required" },
    { title: "Molar mass", field: "molar_mass", sorter: "number", editor: "input", validator: "required" },
  ],

  validationFailed: function (cell, value, validators) {
    //cell - cell component for the edited cell
    //value - the value that failed validation
    //validatiors - an array of validator objects that failed
    console.log("cell clicked: value: " + value + "(", cell, ")");
    //take action on validation fail
  },
  cellEdited: function (cell) {
    //This callback is called any time a cell is edidted
    console.log("cell edited: (", cell, ")");
  },
  rowClick:function(e, row) {
    console.log("On cell clicked", row);
    if (currRow == null) {
      console.log("On cell clicked; currRow == null");
      currRow = row;
      document.getElementById("del-row").disabled = false;
      document.getElementById("update-db").disabled = false;
      return;
    }
    document.getElementById("del-row").disabled = false;
    document.getElementById("update-db").disabled = false;
    currRow.toggleSelect();
    currRow = row;
  }
});

function onAddRowClicked() {
  console.log("Add row clicked");
  
  table.addRow({number: '1',abbreviation:"abr",name:'namd',atomic_mass:0,molar_mass:0});
}

function onDeleteRowClicked() {
  console.log("Delete row clicked");
  var row = currRow.getNextRow();
  console.log("Delete row clicked; ", row);
  currRow.delete();

  if (row == false) {
    console.log("Delete row clicked; row == null");
    document.getElementById("del-row").disabled = true;
    return;
  }
  
  currRow = row;
  currRow.toggleSelect();
}

fetch('/api', { method: 'post', }).then(function (response) {
  console.log("response: (" + response + ")<--");
  return response.json();
}).then(function (data) {
  console.log("Data: (" + JSON.stringify(data, "", 2) + ")<--");
  table.setData(data);

});
