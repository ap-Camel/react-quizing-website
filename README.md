# Simple React Quizing Website

## Live Version

- [Website Link](https://quizingwebsite.azurewebsites.net).

## Website Description

- users can create their own account.
- users can search for quizes and see the details of the quiz they select.
- users can create their own quizes and add questions to them.
- users can take a quiz.
- users can see they results of the past quizes they took.
- users can select a past quiz they took and see their answers and if the answers were correct.
- users can see their user information and can change them.

## Dependencies

- need to install [react-router-dom](https://www.npmjs.com/package/react-router-dom).
- need to install [redux@toolkit](https://redux-toolkit.js.org/).

## Backend

- the website connects to an external api that handles all the data manipulation.
- [link to api page](https://github.com/ap-Camel/QuizingApi).

## Disclaimers

- this website is hosted on azure and is hosted for free so it is slow.
- the api is also hosted on azure for free so its also slow there.
- the design was not the main focus of this project, but using react, and redux, make componansts reusable and making sure everything works properly.
- there is no css library, all css is custome.

## Examples

### Signup page

here the confirm password and username fields  work properly but the email field is not actually email and can put any string in.

![sign up page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-28%20061051.png)

### Login page

![login page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-28%20061035.png)

### Search results page

- the search results are also stored in localStorage so not to make too many api calls
- this page also shows the top quizes based on populaity

![search results](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20202749.png)

### Public Quiz Details page

- in this page the public information of a quiz is shown
- user can also see what questions are in the quiz if they choose to by pressing show button

![public quiz details](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20214624.png)

### Quiz Page

- in this page user can take quiz

![quiz page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-28%20053725.png)

### My Quizes page

-in this page user can see the quizes they created and also create new quizes

![My quizes page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20214712.png)

### private quiz details page

- in this page user can see all information about quiz.
- user can also see the questions and answers in the quiz.
- user can also add new questions and answers.

![private quiz details](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20214805.png)

### Add question modal

- here the user can add new question and answers of the question

![add question modal](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20214938.png)

### Edit quiz modal

- here user can edit quiz information

![edit modal](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-27%20215620.png)

### History page

- here user can see their history of taken examinations

![history page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-28%20054017.png)

### History details page

- here user can see which answers they chose.

![history details page](https://github.com/ap-Camel/react-quizing-website/blob/master/github-pictures/Screenshot%202022-08-28%20054728.png)
