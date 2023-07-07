# SE_Project_React

### `Domain`

[https://sweaterweather.umhl.com/](https://sweaterweather.umhl.com/)

### `Decription`

Using the technologies and functionalities exclusive to React, I created an application where a user can view the current temperature of a specfied city and create an account in which they can create clothing items.

When the user is logged in, more functionality is permitted to the user:

- The user is able to create clothing items
- The user is able to access all clothing items
- The user is able to "like" the cards the respective user has created
- The user is able to update the respective user's name and avatar
- The user is able to log off

With the specified ideal weather to wear a piece of clothing in (provided by the user), the application is able to display the pieces of clothing ideal to wear in respect to the weather of the specified city.

### `Technologies and Techniques`

Contrary to the technologies I used on my last project, this project I used hooks available to developers using React. I used useState() and useEffect() to name a few. Additionally, I implemented front-end authentication through the power of API calls and tokens! Lastly, the useEffect() hook was used to authenticate all of the forms.

An API from [weathermap.org](weathermap.org) was used for the application to get weather data from a specified longitude and latitude.

### `Screenshots`

The application offers a user-friendly, aesthetically-pleasing user interface that makes it easy for anyone to "pick up" my app and maneuver their way throughout the application,

#### 'Not Signed In'

![ScreenshotOfNotSignedIn](/src/images/WTWR-fullScreen.png)

When the user is logged off, the user will not see any cards. Rather, the user will only be able to see the current temperature of the specified city, the "log in" button, and the "sign up" button.

#### 'Invalid Inputs in Form'

![ScreenshotOfIncorrectlyFilledOutForm](/src/images/WTWR-invalidFormInput.png)

When the user incorrectly fills out an input, the user will see the incorrectly filled out input turn red. Additionally, if the whole form is not completed correctly, the button to submit the form will be didabled and appear gray.

#### 'Correctly Completed Inputs and Form'

![ScreenshotOfCorrectlyFilledOutForm](/src/images/WTWR-validFormInput.png)

When the user correctly fills out the complete form, the submit button will be enabled and all inputs as well as the submit button will appear black.

#### 'Signed In - Main Page'

![ScreenshotOfSignedInMainPage](/src/images/WTWR-signedInMainPage.png)

When the user is logged in and on the main page, the user will see all of the cards created, the name of the current user, and the specified avatar of the user. The option to add a new card will be made available to the user. The current user may also like any cards the user wishes to like.

#### 'Signed In - Profile Page'

![ScreenshotOfSignedInProfilePage](/src/images/WTWR-signedInProfilePage.png)

When the user is logged in and on the profile page, the user will see all the cards created by the current user as well as the option to change the current user's profile data and log the current user off.

#### 'Item Modal Open'

![ScreenshotOfItemModalOpen](/src/images/WTWR-itemModalOpen.png)

When the user clicks on any card, a modal will appear that will expand the clothing item and present the user with the name of the clothing item, the weather the clothing item's respective creator specified, and the delete button. Although everyone is presented with the "delete item" card, only the clothing item's respective creator is able to delete the card.

### 'Backend'

The GitHub repo for the backend is available [here](https://github.com/propitive/se_project_express).
