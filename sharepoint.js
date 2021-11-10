<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script>
var urlLink = _spPageContextInfo.webAbsoluteUrl;

var utm = [
    {
        title: "source",
        link: "utm_source"
    },
    {
        title: "medium",
        link: "utm_medium"
    },
    {
        title: "campaign",
        link: "utm_campaign"
    },
    {
        title: "term",
        link: "utm_term"
    },
    {
        title: "content",
        link: "utm_content"
    }
]

for (let i = 0; i < utm.length; i++) {
    getLists(utm[i]);
}

function getLists(utm) {
    $.ajax({
        url: urlLink + "/_api/lists/GetByTitle('" + utm.link + "')/Items?$select=Title",
        type: "GET", //POST
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
        },
        success: function (d) {
            var stringData = JSON.stringify(d);
            var jsonObject = JSON.parse(stringData);
            var results = jsonObject.d.results;
            
            for (i = 0; i < results.length; i++) {
                var option = document.createElement("option");
                option.value = results[i]["Title"];
                option.text = results[i]["Title"].charAt(0) + results[i]["Title"].slice(1);
                document.getElementById("append" + utm.title).appendChild(option);
            }

        },
        error: function() {
            console.log('fail');
        }
    });
}
</script>

<script>
var urlLink = _spPageContextInfo.webAbsoluteUrl;

function createListItem(utm, meta, value) {
    $.ajax
        ({
            // _spPageContextInfo.webAbsoluteUrl - will give absolute URL of the site where you are running the code.
            // You can replace this with other site URL where you want to apply the function
            url: urlLink + "/_api/lists/GetByTitle('" + utm + "')/Items",
            type: "POST",
            data: JSON.stringify({__metadata:{type:"SP.Data." + meta + "ListItem"}, Title: value.value}),
            headers:
        {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
            success: function () {
                alert('"' + value.value + '" has been added to the ' + utm + " SharePoint list.");
            },
            error: function () {
                alert("Failed to add to list.");
            }
        });
}
</script>

<script>

function generateURL(engLink, fraLink) {

    let source = document.getElementById("sourcevalue").value;
    let medium = document.getElementById("mediumvalue").value;
    let campaign = document.getElementById("campaignvalue").value;
    let term = document.getElementById("termvalue").value;
    let content = document.getElementById("contentvalue").value;

    let sourceChecked = true;
    let mediumChecked = true;
    let campaignChecked = true;
    let termChecked = true;
    let contentChecked = true;

    let utm = "";
    let eng = engLink.value;
    let fra = fraLink.value;
    let engURL = "";
    let fraURL = "";

    if (source === "") {
        sourceChecked = false;
    }

    if (medium === "") {
        mediumChecked = false;
    }

    if (campaign === "") {
        campaignChecked = false;
    }

    if (term === "") {
        termChecked = false;
    }

    if (content === "") {
        contentChecked = false;
    }

    if (sourceChecked) {
        utm += "?utm_source=";
        utm += source;
    }

    if (mediumChecked) {
        if (sourceChecked) {
            utm += "&utm_medium=";
        } else {
            utm += "?utm_medium=";
        }
        utm += medium;
    }

    if (campaignChecked) {
        if (sourceChecked || mediumChecked) {
            utm += "&utm_campaign=";
        } else {
            utm += "?utm_campaign=";
        }
        utm += campaign;
    }

    if (termChecked) {
        if (sourceChecked || mediumChecked || campaignChecked) {
            utm += "&utm_term=";
        } else {
            utm += "?utm_term=";
        }
        utm += term;
    }

    if (contentChecked) {
        if (sourceChecked || mediumChecked || campaignChecked || termChecked) {
            utm += "&utm_content=";
        } else {
            utm += "?utm_content=";
        }
        utm += content;
    }

    if (eng !== "") {
        engURL = eng + utm;
    } else {
        engURL = "";
    }

    if (fra !== "") {
        fraURL = fra + utm;
    } else {
        fraURL = "";
    }

    document.getElementById("engLink").value = engURL;
    document.getElementById("fraLink").value = fraURL;

}
</script>