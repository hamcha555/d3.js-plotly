//Path to Belly Button Data
const path = "samples.json";

function init() {
    d3.json(path).then(function(data) {
        sample_values =  data.samples[0].sample_values.slice(0,10).reverse();
        console.log(sample_values);
        otu_ids =  data.samples[0].otu_ids.slice(0,10);
        console.log (otu_ids); 
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        otu_labels = data.samples[0].otu_labels.slice(0,10);
        console.log(otu_labels);

        let data2 = [{
            x: sample_values,
            y: yticks,
            text: otu_labels,
            labels: otu_ids,
            type: "bar",
            orientation: "h"
        }];

        var layout = {
            // height: 500,
            // width: 400,
            margin: {
                l: -50,
                r: 0,
                t: 10
            }
        };

        Plotly.newPlot("bar", data2, layout);
        // Plotly.newPlot("bar", data2);


        let data3 = [{
            mode: 'markers', 
            x: otu_ids,
            y: sample_values,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            },
            text: otu_labels
        }];

        var layout2 = {
            // height: 600,
            // width: 1200,
            margin: {
                l: -100,
                r: 0,
                t: 30
            },
            title: {text: "Bacteria Cultures in Samples"},
            xaxis: {title: "OTU ID"}
        };


        Plotly.newPlot("bubble", data3, layout2);
        // testsubjectid()
        

    });
}

// d3.selectAll("#selDataset").on("change", testsubjectid);

testsubjectid()

// var otu_ids;
function testsubjectid() {
    var dropdownMenu = d3.select("#selDataset");
    
    d3.json(path).then((data) =>{
        // console.log(data)
        data.names.forEach(element => {
            dropdownMenu.append("option").text(element).property("value")
        });
        // metadata(dropdownMenu.property("value"));
        // updatechart(dropdownMenu.property("value"));
        optionChanged(dropdownMenu.property("value"));
    })
};

function optionChanged(user_id){

    metadata(user_id)
    updatechart(user_id)
}

function metadata(subjectid){
    d3.json(path).then((data) =>{
       meta = data.metadata
    //    console.log(meta)
       meta_id = meta.filter(i=>i.id==subjectid)
    //    console.log(meta_id)
    
    demo_id = meta_id[0]
        // Clear out current contents in the panel
		d3.select("#sample-metadata").html("");
        // Add new content
       var placeholder = d3.select("#sample-metadata")
       Object.entries(demo_id).forEach(([key,value])=>{
           placeholder.append("p").text(`${key}:${value}`)
       })

    })
} 


function updatechart(subjectid){
    d3.json(path).then((data) =>{

        x = (element) => element == subjectid
        sample_index = data.names.findIndex(x);

        console.log(`Sample Index: ${sample_index}`)

        sample_values =  data.samples[sample_index].sample_values.slice(0,10).reverse();
        otu_ids =  data.samples[sample_index].otu_ids.slice(0,10);
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        otu_labels = data.samples[sample_index].otu_labels.slice(0,10);
    
        // console.log(`SampleValues: ${sample_values}`)
        // console.log(`otu_ids: ${otu_ids}`)
        // console.log(`otu_labels: ${otu_labels}`)
        
        Plotly.restyle("bar","x", [sample_values]);
        Plotly.restyle("bar","labels", [otu_ids]);
        Plotly.restyle("bar","y", [yticks]);
        Plotly.restyle("bar","text", [otu_labels]);
    
        Plotly.restyle("bubble", "x", [otu_ids]);
        Plotly.restyle("bubble","y",[sample_values])
        // Plotly.newPlot("bubble", data3, layout2);

    })
} 

init()