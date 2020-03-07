/*
Title: LAB 2
Author: Sterling Wenzelbach
Student ID: 100299329
Since: 2020-02-18
*/

class User
{
    constructor(firstName = "John", lastName = "Doe", userName = "", emailAddress = "", password = "")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.emailAddress = emailAddress;  
        this.password = password; 
    }
}
"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
       let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
      
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        $("#loginForm").submit  ((e)=>
        {
            if(document.getElementById("loginForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();

                //if inputs are not empty/null
                if(!$("#loginName").val() == null || $("#password").val() == null)
                {
                    console.log("not empty");
                    //fetch values
                    let loginName = $("#loginName").val();
                    let password = $("#password").val();
        
                    let navBarName = $("#login")[0];
                    let existingNavText = $(".navbar-text");

                    //if username exists, clear it
                    if(existingNavText.length > 0) {
                        $(".navbar-text").html(loginName);
                    }
                    else 
                    {
                        //create login name element and insert it.
                        let loggedInName = document.createElement('span');
                        loggedInName.setAttribute('class', 'navbar-text');
                        loggedInName.textContent = loginName;
                        let parentNode = navBarName.parentNode;
                        parentNode.insertBefore(loggedInName, navBarName);

                        $("#loginForm")[0].reset();
                        $("#login").hide();
                        $("#logout").show();
                    }
                }
                else
                {
                    console.log("empty");
                }
            }
        });

    }

    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        //Create errormessage display element
        let errorMessage = document.createElement('div');
        $(errorMessage).addClass("alert alert-danger");
        errorMessage.setAttribute('id', 'errorMessage');
        //errorMessage.setAttribute('class', "alert alert-danger");

        //Insert the errormessage display after this...
        $(".hint-text")[0].append(errorMessage);

        //clears the form
        function clearForm()
        {
            $("#registerForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        
        //$("#firstName").select();

        // First Name Events
        $("#firstName").blur((e)=>
        {
            validateInput("#firstName",( $("#firstName").val().length < 2),"First Name is Too Short");
        });

        $("#firstName").focus((e)=>
        {
            $("#firstName").select();
        });

        
        // Last Name Events
        $("#lastName").blur((e)=>
        {
            validateInput("#lastName",( $("#lastName").val().length < 2),"Last Name is Too Short");
        });

        $("#lastName").focus((e)=>
        {
            $("#lastName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });
        // password Events
        $("#password").blur((e)=>
        {
            validateInput("#password",($("#password").val().length < 6) ,"Password is too short!");

        });

        $("#password").focus((e)=>
        {
            $("#password").select();
        });

        // confirm password Events
        $("#confirmPassword").blur((e)=>
        {
            //check that passwords match
             validateInput("#confirmPassword",($("#confirmPassword").val().length < 6) ,"Confirm Password is too short!");
             if($("#confirmPassword").val() != $("#password").val())
             {
                 $("#confirmPassword").select();
                 $("#errorMessage").show();
                 $("#errorMessage").text("Passwords do not match!");
             }
        });


        $("#confirmPassword").focus((e)=>
        {
            $("#confirmPassword").select();
        });

        //When the form is submitted
        $("#registerForm").submit  ((e)=>
        {
            //stop default behaviours
            e.preventDefault();
            e.stopPropagation();

            if(document.getElementById("registerForm").checkValidity() == false)
            {
                // console.log($("#password").val());
                // console.log($("#confirmPassword").val());

                if($("#password").val() != $("#confirmPassword").val())
                {
                    $("#errorMessage").show();
                    $("#errorMessage").text("Passwords do not match!");

                    console.log("not match");
                }
                else
                {
                    console.log("match");
                    clearForm();
                }

            }

            //Create a new user object
            let user = new User();

            //Fetch values from input boxes
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let emailAddress = $("#emailAddress").val();
            let password = $("#password").val();

            //set user values
            user.firstName = firstName;
            user.lastName = lastName;
            user.emailAddress = emailAddress;
            user.password = password;

            console.log(user);
        });
    }

    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

