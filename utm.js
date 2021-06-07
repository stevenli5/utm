const mydata = JSON.parse(data);


function generateURL(engLink, fraLink) {

    let source = document.getElementById("source").value;
    let source2 = document.getElementById("source2").value;
    let medium = document.getElementById("medium").value;
    let medium2 = document.getElementById("medium2").value;
    let campaign = document.getElementById("campaign").value;
    let campaign2 = document.getElementById("campaign2").value;
    let term = document.getElementById("term").value;
    let term2 = document.getElementById("term2").value;
    let content = document.getElementById("content").value;
    let content2 = document.getElementById("content2").value;

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

    if ((source === "") && (source2 === "")) {
        sourceChecked = false;
    }

    if ((medium === "") && (medium2 === "")) {
        mediumChecked = false;
    }

    if ((campaign === "") && (campaign2 === "")) {
        campaignChecked = false;
    }

    if ((term === "") && (term2 === "")) {
        termChecked = false;
    }

    if ((content === "") && (content2 === "")) {
        contentChecked = false;
    }

    if (sourceChecked) {
        utm += "?utm_source=";
        if (source2 !== "") {
            utm += source2;
        } else {
            utm += source;
        }
    }

    if (mediumChecked) {
        if (sourceChecked) {
            utm += "&utm_medium=";
        } else {
            utm += "?utm_medium=";
        }
        if (medium2 !== "") {
            utm += medium2;
        } else {
            utm += medium;
        }
    }

    if (campaignChecked) {
        if (sourceChecked || mediumChecked) {
            utm += "&utm_campaign=";
        } else {
            utm += "?utm_campaign=";
        }
        if (campaign2 !== "") {
            utm += campaign2;
        } else {
            utm += campaign;
        }
    }

    if (termChecked) {
        if (sourceChecked || mediumChecked || campaignChecked) {
            utm += "&utm_term=";
        } else {
            utm += "?utm_term=";
        }
        if (term2 !== "") {
            utm += term2;
        } else {
            utm += term;
        }
    }

    if (contentChecked) {
        if (sourceChecked || mediumChecked || campaignChecked || termChecked) {
            utm += "&utm_content=";
        } else {
            utm += "?utm_content=";
        }
        if (content2 !== "") {
            utm += content2;
        } else {
            utm += content;
        }
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