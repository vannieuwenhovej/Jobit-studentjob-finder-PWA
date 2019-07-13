"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
    console.log("application is ready for use.");
    // fetchAPI();
    fetchAllOpenJobs();
    $('#jobModal').on('shown.bs.modal', function () {
        $('#jobModal').trigger('focus')
    });
    $('#sollicitateModal').on('shown.bs.modal', function () {
        $('#sollicitateModal').trigger('focus')
    });
    document.querySelector("#modalCloseButton").addEventListener("click", resetModal);
}

function resetModal(){
    document.querySelector("#modalFunction").innerText = "loading...";
    document.querySelector("#modalWage").innerText = "";
    document.querySelector("#modalCompany").innerText = "loading company details...";
    document.querySelector("#modalPeriod").innerText = "";
    document.querySelector("#modalDescription").innerText = "loading...";
    document.querySelector("#modalWantedProfile").innerText = "loading...";

}

function fetchAPI(){
    fetch('http://192.168.10.10/api/apitest')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
        });
}

function fetchAllOpenJobs(){
    fetch('http://192.168.10.10/api/jobs')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            makeJobsVisibleForUser(myJson);
        });
}

function getJob(e){
    let jobid = e.target.id;
    fetch('http://192.168.10.10/api/job/' + jobid)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            makeJobVisibleForUser(myJson);
        });
}

function makeJobVisibleForUser(json) {
    putJobDataIntoModel(json);
    putCompanyDataInModal(json[0].fldBedrijfID);
}

function putJobDataIntoModel(json){
    let mdlFunction = document.querySelector("#modalFunction");
    let mdlWage = document.querySelector("#modalWage");
    let mdlCompany = document.querySelector("#modalCompany");
    let mdlPeriod = document.querySelector("#modalPeriod");
    let mdlDescription = document.querySelector("#modalDescription");
    let mdlwntdProfile = document.querySelector("#modalWantedProfile");
    mdlFunction.innerText = json[0].fldFunctie;
    mdlWage.innerText = json[0].fldBrutoLoonPerUur;
    //company;
    mdlPeriod.innerText = json[0].fldStartDatum + " till " + json[0].fldEindDatum;
    mdlDescription.innerText = json[0].fldVacatureBeschrijving;
    mdlwntdProfile.innerText = json[0].fldGezochtProfielUitleg;
    let btnSollicitate = document.querySelector(".btnSollicitate");
    btnSollicitate.setAttribute("id", json[0].fldVacatureID);
    btnSollicitate.addEventListener("click", openSolliciationForm);
    $('#jobModal').trigger('show');
}

function openSolliciationForm(e) {
    let btn = document.querySelector(".modalSendToCompany");
    btn.setAttribute("id", e.target.id);
    btn.addEventListener("click", sollicitateForJob);
}

function sollicitateForJob(e){
    let jobID = e.target.id;
    let lastName = document.querySelector("#applicant-lastname");
    let surName = document.querySelector("#applicant-name");
    let birthDate = document.querySelector("#applicant-birthdate");
    let gender = document.querySelector("#applicant-gender");
    let email = document.querySelector("#applicant-email");
    let addressTown = document.querySelector("#applicant-town");
    let addressPostal = document.querySelector("#applicant-postal");
    let addressStreet = document.querySelector("#applicant-street");
    let addressHousenr = document.querySelector("#applicant-housenr");
    let bankName = document.querySelector("#applicant-bankname");
    let bankAccountNr = document.querySelector("#applicant-accountNumber");
    let bankAccountName = document.querySelector("#applicant-nameOnAccount");

    if (lastName.value === "" || surName.value === "" || birthDate.value === "" || email.value === "" ||
        addressTown.value === "" || addressPostal.value === "" || addressStreet.value === "" ||
        addressHousenr.value === "" || bankName.value === "" || bankAccountNr.value === "" ||
        bankAccountName.value === ""){
        showSollicitateError();
    } else{
        let json = '{"jobID":"' + jobID + '",' +
            '"lastName":"' + lastName.value + '",' +
            '"surName":"' + surName.value + '",' +
            '"birthDate":"' + birthDate.value + '",' +
            '"gender":"' + gender.options[gender.selectedIndex].value + '",' +
            '"email":"' + email.value + '",' +
            '"town":"' + addressTown.value + '",' +
            '"street":"' + addressStreet.value + '",' +
            '"postalCode":"' + addressPostal.value + '",' +
            '"houseNr":"' + addressHousenr.value + '",' +
            '"bankName":"' + bankName.value + '",' +
            '"bankAccount":"' + bankAccountNr.value + '",' +
            '"bankAccountName":"' + bankAccountName.value +
            '"}';
        let jsonObj = JSON.parse(json);
        sendSollicitantsDetailsToServer(jsonObj);

    }
}

function sendSollicitantsDetailsToServer(detailsObj) {
    //Promise
    fetch("http://192.168.10.10/api/sollicitate", {
        method: 'POST',
        body: JSON.stringify(detailsObj),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res)
        .then(function(response){
            //Promise should be "success" when fulfilled
            // console.log(response.text());
        })
        .catch(error => console.error('Error:', error));
    popUpSuccessNotification("Information sent to company! They will email you if they're interested!");
}

function popUpSuccessNotification(string){
    $('#sollicitateModal').modal('hide');
    $('#jobModal').modal('hide');
    let notif = document.querySelector("#jobNotificationSuccess");
    notif.innerText = string;
    notif.style.display = "block";
    setTimeout(function () {
        notif.style.display = "none";
    }, 5000);
}

function showSollicitateError(){
    let notif = document.querySelector("#sollicitateNotComplete");
    notif.style.display = "block";
    setTimeout(function () {
        notif.style.display = "none";
    }, 5000);
}


function putCompanyDataInModal(id){
    fetch('http://192.168.10.10/api/company/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let mdlCompany = document.querySelector("#modalCompany");
            mdlCompany.innerText = myJson[0].fldBedrijfNaam + " (" + myJson[0].fldBedrijfSector + " in " + myJson[0].fldBedrijfGemeente + ")";
        });

}

function makeJobsVisibleForUser(json){
    let companyIDs = [];
    let container = document.querySelector("#jobContainer");
    for (let i=0; i<json.length; i++){
        let div = "\n" +
            "        <div class=\"jobAd p-2 bd-highlight d-flex bd-highlight w-100\">\n" +
            "            <div class=\"p-2 bd-highlight w-25\"><img src=\"assets/img/300x300.png\" alt=\"pic\" class=\"img-thumbnail rounded mx-auto\"></div>\n" +
            "            <div class=\"p-2 bd-highlight d-flex flex-column bd-highlight w-75\">\n" +
            "                <div class=\"p-2 bd-highlight w-100\"><h3>" + json[i].fldFunctie + "</h3></div>\n" +
            "                <div class=\"p-2 bd-highlight w-100\"><h5><span class='companyid" + json[i].fldBedrijfID + "'>loading company...</span> | &#8364 <span class='wageOfJob'>" + json[i].fldBrutoLoonPerUur + "</span> / u</h5></div>\n" +
            "                <div class=\"p-2 bd-highlight w-100\"><span>" + json[i].fldVacatureBeschrijving + "</span></div>\n" +
            "<button data-toggle=\"modal\" data-target=\"#jobModal\" type=\"button\" class=\"btn btn-outline-secondary seejob\" id=\"" + json[i].fldVacatureID + "\">See job details</button>" +
            "            </div>\n" +
            "        </div>";

        //I do it this way because I would fetch the same company too often
        if(!(companyIDs.includes(json[i].fldBedrijfID))){
            companyIDs.push(json[i].fldBedrijfID);
        }

        container.innerHTML += div;
    }
    container.removeChild(document.querySelector("#loading"));
    //So now all the IDs are distinct, never doubles
    for (let i=0; i<companyIDs.length; i++){
        fetchCompanyByID(companyIDs[i]);
    }
    addEventlistenersOnButtons();
}


function fetchCompanyByID(id){
    fetch('http://192.168.10.10/api/company/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            let allJobsOfCompany = document.querySelectorAll(".companyid" + id);
            for(let i=0; i<allJobsOfCompany.length; i++){
                allJobsOfCompany[i].innerHTML = myJson[0].fldBedrijfNaam;
            }
        });
}

function addEventlistenersOnButtons(){
    let buttons = document.querySelectorAll(".seejob");
    for (let i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click", getJob);
    }
}