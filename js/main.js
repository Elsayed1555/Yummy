const btnShowSearch=document.getElementById("showSearch"); 
const btnShowCategories = document.getElementById("showCategories");
const btnShowArea = document.getElementById("showArea");
const btnShowIngradients = document.getElementById("showIngradients");
const btnShowContacts = document.getElementById("showContacts");
let submitBtn;
let nameValid = false;
let emailValid = false;
let phoneValid = false;
let ageValid = false;
let passwordValid = false;
let repasswordVaild = false;


 myData=document.getElementById("myData");
 searchContainer=document.getElementById("searchContainer");
 
 
 $(document).ready(function () {
        searchByName("").then(function () {
            $(".loading-screen").fadeOut(500)
            $("body").css("overflow", "visible")
        })
    })
 
 async function searchByName(term) {
    closeNavbar();
    document.getElementById("myData").innerHTML=""
        $(".inner-loading-screen").fadeIn(300)
    
        let respons = await fetch(`
        https://www.themealdb.com/api/json/v1/1/search.php?s=${term}
        `)
        respons = await respons.json()
        if(respons.meals){
            displayMeals(respons.meals)
        }else{displayMeals([])}
        $(".inner-loading-screen").fadeOut(300)
    
    }


    function displayMeals(list) {
            let cartona = "";
            list.forEach(element => {
                cartona += `
                <div class="col-md-3">
                        <div onclick="getMealDetails('${element.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                            <img class="w-100" src="${element.strMealThumb}" alt=${element.strMeal}>
                            <div class="layer position-absolute d-flex align-items-center text-black p-2">
                                <h3>${element.strMeal}</h3>
                            </div>
                        </div>
                </div>
                `
            });
            document.getElementById("myData").innerHTML=cartona
        }
function openNavbar() {
    $(".nav-menu").animate({left: 0
    }, 500)

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
 function closeNavbar() {
    let navWidth= $(".nav-menu .nav-tab").innerWidth()
    $(".nav-menu").animate({
        left: -navWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({top:300},500)

}

closeNavbar()
$(".nav-menu i.open-close-icon").click(() => {
    if ($(".nav-menu").css("left") == "0px") {
        closeNavbar()
    } else {
        openNavbar()
    }
})

 async function getMealDetails(mealID) {
    closeNavbar();
    document.getElementById("myData").innerHTML="";
    $(".inner-loading-screen").fadeIn(300)
    document.getElementById("searchContainer").innerHTML="";
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respons = await respons.json();

    displayMealDetails(respons.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}
 function displayMealDetails(meal) {



    let ing = ``

    for (let i = 1; i<=20 ; i++) {
        if (meal[`strIngredient${i}`]) {
            ing += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if(!tags){
        tags=[];
    }
    let tagString = ''
    for (let i = 0; i < tags.length; i++) {
        tagString += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                 <ul class="list-unstyled d-flex g-2 flex-wrap">
                     ${ing}
                 </ul>

                <h3>Tags :</h3>
                 <ul class="list-unstyled d-flex g-3 flex-wrap">
                     ${tagString}
                 </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    document.getElementById("myData").innerHTML=cartona;
}

function showSearchData() {
    document.getElementById("myData").innerHTML="";
    document.getElementById("searchContainer").innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="search by name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="search by first letter">
        </div>
    </div>`
    myData.innerHTML="";
}
btnShowSearch.addEventListener("click",function(){
    closeNavbar();
    showSearchData();
    
})
 async function searchByFirstLetter(term) {
    closeNavbar();
    myData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    term==""? "a":"";
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    respons = await respons.json()

    if(respons.meals){
        displayMeals(respons.meals)
    }else{displayMeals([])}
    $(".inner-loading-screen").fadeOut(300)

}

 function displayCategory(list) {
    let cartona = "";
    list.forEach((element) => (
        cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${element.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${element.strCategoryThumb}" alt="">
                    <div class="layer position-absolute text-center text-black p-2">
                        <h3>${element.strCategory}</h3>
                        <p>${element.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    ))

    myData.innerHTML = cartona;
}
async function getCategory() {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    respons = await respons.json()

    displayCategory(respons.categories)
    $(".inner-loading-screen").fadeOut(300)

}
btnShowCategories.addEventListener("click",()=>{
    getCategory();
    closeNavbar();
})

 async function getCategoryMeals(term) {
    myData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
    respons = await respons.json()


    displayMeals(respons.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

 function displayArea(list) {
    let cartona = "";
    list.forEach((element) => (
        cartona += `
        <div class="col-md-3">
                <div onclick="areaMeals('${element.strArea}')" class=" cursor-pointer rounded-2 text-center ">
                        <i class="fa-solid fa-house-laptop fa-3x"></i>
                        <h3>${element.strArea}</h3>
                </div>
        </div>
        `
    ))


    myData.innerHTML = cartona;
}
 async function getArea() {
    myData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respons = await respons.json()

    displayArea(respons.meals);
    $(".inner-loading-screen").fadeOut(300)

}

btnShowArea.addEventListener("click",function(){
    getArea();
    closeNavbar();
})
 async function areaMeals(term) {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`)
    respons = await respons.json()


    displayMeals(respons.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}



 async function getIngredients() {
    myData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respons = await respons.json()

    displayIngredients(respons.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
btnShowIngradients.addEventListener("click",function(){
    getIngredients();
    closeNavbar();
})

 function displayIngredients(list) {
    let cartona = "";
    list.forEach((element) => (
        cartona += `
        <div class="col-md-3">
                <div onclick="ingredientsMeals('${element.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${element.strIngredient}</h3>
                        <p>${element.strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    ))

    myData.innerHTML = cartona;
}


 async function ingredientsMeals(term) {
    myData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`)
    respons = await respons.json()


    displayMeals(respons.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)
}

btnShowContacts.addEventListener("click", () => {
    showContacts();
    closeNavbar();
}
);
function nameValidation() {
    let regex=/^[a-zA-Z ]+$/
    return (regex.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return (regex.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    let regex=/^(012|015|011|010)\d{8}$/
    return (regex.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    let regex=/^(1[0-9]|[2-8][0-9]|90)$/
    return (regex.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    let regex=/^(?=.*[A-Za-z])(?=.*\d).{8,}$/
    return (regex.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

function inputsValidation() {
    if (nameValid) {
        if (nameValidation()) {
            document.getElementById("nameInputAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameInputAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailValid) {

        if (emailValidation()) {
            document.getElementById("emailInputAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailInputAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneValid) {
        if (phoneValidation()) {
            document.getElementById("phoneInputAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneInputAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageValid) {
        if (ageValidation()) {
            document.getElementById("ageInputAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageInputAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordValid) {
        if (passwordValidation()) {
            document.getElementById("passwordInputAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordInputAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordVaild) {
        if (repasswordValidation()) {
            document.getElementById("repasswordInputAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordInputAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() &&
        passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
function showContacts() {
    myData.innerHTML = `<div class="contactUs  d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-3">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="enter your name">
                <div id="nameInputAlert" class="alert alert-danger w-100 m-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="enter your email">
                <div id="emailInputAlert" class="alert alert-danger w-100 m-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="enter your phone">
                <div id="phoneInputAlert" class="alert alert-danger w-100 m-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="enter your age">
                <div id="ageInputAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="enter your password">
                <div id="passwordInputAlert" class="alert alert-danger w-100 m-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="repassward">
                <div id="repasswordInputAlert" class="alert alert-danger w-100 m-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn"  class="btn btn-outline-danger px-2 m-3">Submit</button>
    </div>
</div> `
     submitBtn = document.getElementById("submitBtn")


     document.getElementById("nameInput").addEventListener("focus", function(){
        nameValid = true
    })

    document.getElementById("emailInput").addEventListener("focus", function(){
        emailValid = true
    })

    document.getElementById("phoneInput").addEventListener("focus", function(){
        phoneValid = true
    })

    document.getElementById("ageInput").addEventListener("focus",function(){
        ageValid = true
    })

    document.getElementById("passwordInput").addEventListener("focus", function(){
        passwordValid = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordVaild = true
    })
}




let conWidth= $(".nav-menu").innerWidth()
console.log(conWidth);