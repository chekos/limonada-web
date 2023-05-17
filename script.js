function getAnswers() {

  // Create an object to store the answers
  const answers = {};
  answers["form-name"] = document.getElementById('questionnaireForm').getAttribute('name');
  const date = new Date();
  answers['ts'] = date.getTime();
  answers['local_date'] = date.toString();
  answers['items'] = [];
  
  // Retrieve the user's selections for each question
  const questionElements = document.getElementsByClassName('question');
  for (let i = 0; i < questionElements.length; i++) {
    const question = questionElements[i];
    const questionId = question.getAttribute('data-question-id');
    const questionText = question.querySelector('p:first-child').textContent;
    const answer = question.querySelector('input[type="radio"]:checked, input[type="text"]').value;
    const checkedLabel = question.querySelector('input[type="radio"]:checked + label')?.textContent ?? 'No label selected';
    answers.items.push({ 'questionId': questionId, 'value': answer, 'answer': checkedLabel, 'question': questionText });
  }

  // Convert the answers object to JSON
  const jsonAnswers = JSON.stringify(answers);

  // Display the JSON object at the bottom of the page
  const jsonContainer = document.getElementById('jsonContainer');
  jsonContainer.innerHTML = jsonAnswers;

  // send telegram data
  Telegram.WebApp.sendData(jsonAnswers);
  Telegram.WebApp.close();
}


const form = document.getElementById('questionnaireForm');
form.addEventListener('submit', getAnswers)

Telegram.WebApp.expand();
Telegram.WebApp.ready();
Telegram.WebApp.MainButton.setText('Submit').show().onClick(getAnswers);
