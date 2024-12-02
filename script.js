const userImg=document.querySelector(".Image");
const userNameField=document.querySelector(".name");
const userFollowersCount=document.querySelector(".followers");
const githubUserName=document.querySelector(".userName");
const submitBtn=document.querySelector(".submit");
const userDataCard=document.querySelector(".card");
const spinner = document.getElementById("spinner");


let userName="";
let buttonClicked=false;


submitBtn.addEventListener('click', () =>{

    if(buttonClicked==true)return;
    buttonClicked=true;

    submitBtn.innerText="Searching.."
    spinner.style.display = "block";
    userDataCard.style.visibility="hidden";

    userName=(githubUserName.value);

    let githubUrl = "https://api.github.com/users/";
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let url = proxy + githubUrl + userName;

    fetchData(url);

    return ;
});

async function fetchData(url) {

    console.log("fetching");
    
    try{
        let userData= await fetch(url);
        if(!userData.ok){
            throw new Error("User Not Found");
            return ;
        }

        let data= await userData.json();
        console.log(data);

        let userImgUrl=data.avatar_url;
        let userDataName=data.name;
        let userDataFollowers=data.followers;
        console.log(userImgUrl);
        console.log(userDataName);
        console.log(userDataFollowers);
        
        if(!userDataName)userDataName="Not Available";

        userImg.innerHTML=`<img src="${userImgUrl}" alt="${userDataName}  avatar"></img>`;
        userNameField.innerText=`User: ${userDataName}`;
        userFollowersCount.innerText=`Followers: ${userDataFollowers}`;
        userDataCard.classList.add("visible");
        userDataCard.style.visibility="visible";
        
        return ;
    }
    catch(error){
        alert(error);
    }
    finally{
        githubUserName.value="";
        submitBtn.innerText="Search";
        buttonClicked=false;
        spinner.style.display = "none";
    }
}

