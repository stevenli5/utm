
let siteUrl = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;

jQuery.ajax({
    url: siteUrl + "/eng/steven-test/_api/lists/GetByTitle('utm_source')/Items?$select=Title",
    type: "GET",    
    headers: { 
        "accept": "application/json;odata=verbose",
        "content-type":"application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
    },
    success: function(d) {
        let stringData = JSON.stringify(d);
        let jsonObject = JSON.parse(stringData);
        let results = jsonObject.d.results;

     let select = document.createElement("select");
    select.name = "utm_source";
    select.id = "utm_source";
 
    for (i = 0; i < results.length;i++)
    {
        let option = document.createElement("option");
        option.value = results[i]["Title"];
        option.text = results[i]["Title"].charAt(0) + results[i]["Title"].slice(1);
        select.appendChild(option);
    }
 
    let label = document.createElement("label");
    label.innerHTML = "Choose your utm_source: "
    label.htmlFor = "utm_source";
 
    document.getElementById("container").appendChild(label).appendChild(select);

    },
    error: function() {
        console.log('fail');
    }
});

