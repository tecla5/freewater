## BDD free-water
[inVision free-water Design](https://projects.invisionapp.com/share/VC7LC1O5Z#/screens/166326868)



#### Modules:
  * Authentication (Login)
  * User LogOut
  * ADD New Fount
  * SEARCH Founts
  * INFORMATION detailed
  * DEL a Fount
  * MODIF a Fount
  * CHANGE views (satellite & map)


------
## User Authentication

**Feature:** User Authentication   
**Background:**Given** the user has an account on Gmail or Facebook.  

**Scenario:**   suceess  
**Given** the user login into free-water   
**When** user put correct email  
**And** password   
**And** user click on login  
**Then** the user should be authenticated  
**And** user should redirect to their dashboard-screen

**Scenario:**   bad credencials  
**Given** the user login into free-water   
**When** user put incorrect email  
**And** password   
**And** user click on login  
**Then** the user is advice of bad credentials  
**And** user the screen remains



## User LogOut

**Feature:** User Logout  
**Background:**Given** the user has been login  
**Scenario:**  
**Given** the user have been login into free-water   
**When** user click on menu
**And** click on Logout  
**Then** the user should Logout  
**And** user should redirect to principal screen on free-water

## Adding New fount

**Feature:** Adding a New fount  
**Background:**Given** the user has been login  

**Scenario:** Success   
**Given** the user click on locate icon  
**When** user click on "add new spot"  
**And** fill the form  
**And** Click on accept  
**Then** the should redirect to the map-screen  
**And** the new spot should added to the map

**Scenario:** error on full form fields   
**Given** the user click on locate icon  
**When** user click on "add new spot"  
**And** dont fill an field into the form  
**And** Click on Accept  
**Then** the user is inform about field pending to fill  
**And** the new screen remains


## Search founts

**Feature:** Search a fount
**Background:**Given** the user NOT need to be logged

**Scenario:** Success   
**Given** the user had not logged   
**When** user click on seach icon
**And** fill some valid adress   
**Then** the app show the adrees on the map-screen  
**And** show founts around


**Scenario:** Not address match   
**Given** the user had not logged   
**When** user click on seach icon
**And** fill invalid adress   
**Then** the app stays on same map-screen  
**And** show a message "not matches found"

## Information of Found detailed

**Feature:** Detailed Information of one Spot.  
**Background:**Given** the user NOT need to be logged

**Scenario:** Success of Detailed information and ADD to favorites  
**Given** the user had not logged   
**When** user click on an spot icon  
**Then** the app shows: Name Of street, km from current location, icon for add to favorite.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**When** user click to favorite icon.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Then** the app shows login screen and a request to login first.


## Delete a Fount

**Feature:** DELETE a New fount  
**Background:**Given** the user has been login  

**Scenario:** Success   
**Given** the user have been login  
**When** user click on a "spot"  
**And** Click on delete buttom  
**And** Click on Accept  
**Then** the should redirect to the map-screen  
**And** the new spot disappear from the map

**Scenario:** Deleting a fount that is not yours   
**Given** the user have been login  
**When** user click on a "spot" that is not yours  
**Then** there is not delete option  

## Modify a fount

**Feature:** Modify a Fount  
**Background:**   
**Given** the user has been login  
**And** the fount exist

**Scenario:** Success   
**Given** the user have been login  
**When** user click on a "spot"  
**And** Click on EDIT buttom  
**And** edit information  
**And** click on accept   
**Then** its should redirect to the map-screen  
**And** some success message appear  
**And** the spot with new info appear

**Scenario:** cancel the modification   
**Given** the user have been login  
**When** user click on a "spot"  
**And** Click on EDIT buttom  
**And** edit information  
**And** click on CANCEL   
**Then** its should redirect to the map-screen  
**And** the spot remains with the same information

## CHANGE views (satellite & map)

**Feature:** change view to satelliteView/mapView
**Background:**Given** the user not need to be looged  
**And** user click on satelliteview on menu

**Scenario:** Success   
**Given** the mapView is ON  
**When** user click on a "satelliteview"  
**Then** its should change the view to satellite

**Scenario:** Success   
**Given**  the satellite view is ON  
**When** user click on a "mapView"  
**Then** its should change to mapView
