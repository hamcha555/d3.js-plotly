// Get the sampdate local file ***MUST USE LIVE SERVER***
const url = "samples.json";

var sample_values;
var otu_ids;
var otu_labels;
var otuId;

// // ////////////////////////////////////////////////////////
// // ----------------GRAPHS --- GRAPHS
d3.json(url).then(function(data) {
    sample_values =  data.samples[0].sample_values.slice(0,10).reverse();
    console.log(`OTU Value ${sample_values}`);
    otu_ids =  data.samples[0].otu_ids.slice(0,10);
    console.log (`OTU ID ${otu_ids}`); 
    otu_labels = data.samples[0].otu_labels.slice(0,10);
    console.log(`OTU label ${otu_labels}`);
    yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

// // -----BAR GRAPH PLOT OTU sample values
    let data2 = [{
      x: sample_values,
      y: yticks,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    }];

    var layout = {
      height: 600,
      width: 1050
    };

  Plotly.newPlot("bar", data2, layout);

  // // -----BUBBLE CHART PLOT OTU sample values
  let data3 = [{
    x: otu_ids,
    y: sample_values,
    hover: "x+y+text",
    mode: "markers",
    text: otu_labels,
    marker: {
      size: sample_values,
      color: otu_ids,
      colorscale: "Earth"
    }
  }];

  var layout3 = {
    title: 'Bubble Chart Size Scaling',
    showlegend: false,
    height: 600,
    width: 1200,
    xaxis:{
      title:'OTU ID'
    }
  };

  Plotly.newPlot("bubble", data3, layout3);
});


// ////////////////////////////////////////////////////////
// // ---------------------Drop Down LISTENER ------------------
d3.select("#selDataset").on("change", testsubjectid);

// This function is called when a dropdown menu item is selected
function testsubjectid() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
// Fetch the JSON data and console log it
    d3.json(url).then((data) =>{
    data.names.forEach(element => {
        dropdownMenu.append("option").text(element).property("value")
    });
    metadata(dataset);
});
};

testsubjectid()

// ////////////////////////////////////////////////////////
// // ---------------------META DATA using LISTENER--------
function metadata(subjectid){
    d3.json(url).then((data) =>{
       meta = data.metadata
       meta_id = meta.filter(mt=>mt.id==subjectid)
       demo_id = meta_id[0]
       // Clear out current contents in the panel
       d3.select("#sample-metadata").html("");
       // Add new content
       var placeholder = d3.select("#sample-metadata")
       Object.entries(demo_id).forEach(([key,value])=>{
           placeholder.append("p").text(`${key}:${value}`)
       })
    })
    console.log(data)
}

