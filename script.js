var pageContent = document.getElementById("mainContent"),
    routingContent = document.getElementById("routingTemplate").innerHTML,
    prechatContent = document.getElementById("prechatTemplate").innerHTML,
    chatAgentContent = document.getElementById("chatAgentTemplate").innerHTML,
    mainContentBody = document.getElementById("mainContentBody"),
    templateTitle = "routingContent";

function setContent(templateName, templateContent) {
    templateTitle = templateName;
    pageContent.innerHTML = templateContent;
    updatePage();
}

function updatePage() {
    if(templateTitle == "routingTemplate") {
        document.getElementById("billing").addEventListener("click", function() {
            setContent("prechatTemplate", prechatContent);
        });
        mainContentBody.style.height = "470px";
    }
    else if(templateTitle == "prechatTemplate") {
        document.getElementById("selState").addEventListener("change", boughtInState);
        mainContentBody.style.height = "675px";
        document.getElementById("submitBtn").addEventListener("click", submitPage);
    }
}
setContent("routingTemplate", routingContent);

function boughtInState(event) {
    if(event.currentTarget.value == "california") {
        document.getElementById("bought").style.display = "block";
    }
    else {
        document.getElementById("bought").style.display = "none";
    }
}

function submitPage(event) {
    event.preventDefault();
    event.stopPropagation();
    var fullNameSel = document.getElementById("fullName"),
        phoneNumberSel = document.getElementById("phoneNumber"),
        fullNameCheck = regexName("^[a-z ,.'-]{4,30}", fullNameSel.value),
        phoneNumberCheck = regexName("^[0-9\-]{9,}", phoneNumberSel.value);

    console.log("fullname ", fullNameCheck);
    if(fullNameCheck) {
        document.getElementById("fullName").classList.remove("iconError");
        document.getElementById("errorTextName").style.display = "none";
    }
    else {
        document.getElementById("fullName").classList.add("iconError");
        document.getElementById("errorTextName").style.display = "block";
    }
    if (phoneNumberCheck) {
        document.getElementById("phoneNumber").classList.remove("iconError");
        document.getElementById("errorTextPhone").style.display = "none";
    }
    else {
        document.getElementById("phoneNumber").classList.add("iconError");
        document.getElementById("errorTextPhone").style.display = "block";
    }
    if(fullNameCheck && phoneNumberCheck) {
         setContent("chatAgentTemplate", chatAgentContent);
    }
}

function regexName(regexString, inputField) {
    var reg = new RegExp(regexString, "i");
    return reg.test(inputField);
}