function buildMetadata(sample) {
    // Call d3 to to select the id of sample-metadata
    d3.json("/data/samples.json").then(function(response){
        console.log(response)
        let data = response;
        let PANEL = d3.select("#sample-metadata");
        PANEL.html("");
    // Add to keys and values to panels with object.entries
        Object.entries(data).forEach(([key, value]) => {
            PANEL.append("p")
            .text(`${key}:${value}`);
    });    
``});
}

// Build Charts

function buildCharts(sample){
    d3.json("/data/samples.json").then(function(response){
        let xAxis = response["otu_ids"];
        let yAxis = response["sample_values"];
        let labels = response["otu_labels"];
        let size = response["sample_values"]

    // Bar Chart
    let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
  
    Plotly.newPlot("bar", barData, barLayout);

    // Bubble Chart
    let bubbleChart = {
        x : xAxis,
        y : yAxis,
        labels: labels,
        mode: "markers",
        marker:{
            size: size,
            color: xAxis
        }
    };
    // Create the layout
    let pieLayout = {
        title: "Bacteria cultures / sample",
        xaxis: {title: "OTU ID"},
    };
    // Plot bubble chart
    Plotly.newPlot("bubble", bubbleChart, pieLayout);    

    });  
}

function init() {
    let selector = d3.select("#selDataset");

    d3.json("/data/samples.json").then((data) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
    });
  
    let firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}
  
    function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}
init();