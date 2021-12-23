//Mobile menu toggle start
const buttons = document.querySelectorAll('.togglebutton')

function toggleMenu(){
    let mobileMenu = document.getElementById('mobileVer')
    if(mobileMenu.classList.contains('mobileVer-open')){
        mobileMenu.classList.remove('mobileVer-open')
    } else {
        mobileMenu.classList.add('mobileVer-open')
    }
}
buttons.forEach(button =>{
    button.addEventListener('click', toggleMenu)
})
//Mobile menu toggle end

//Daily motivation generator 
let quotes = [
    "\"If you want to love others, I think you should love yourself first\". – RM",
    "\“The Best Way To Get Started Is To Quit Talking And Begin Doing.\” – Walt Disney",
    "\"I have come to love myself for who I am, for who I was, and for who I hope to become\".— RM",
    "\“People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.\” – Rob Siltanen",
    "\"Effort makes you. You will regret someday if you don’t do your best now. Don’t think it’s too late but keep working on it. It takes time, but there’s nothing that gets worse due to practicing. So practice.\nYou may get depressed, but it’s evidence that you are doing good\". – Jeon Jungkook",
    "\"Don’t be trapped in someone else’s dream\". – V",
    "\“Don’t Let Yesterday Take Up Too Much Of Today.\” – Will Rogers",
    "\"Your presence can give happiness. I hope you remember that\". – Kim SeokJin",
    "\“We May Encounter Many Defeats But We Must Not Be Defeated.\” – Maya Angelou",
    "\“If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.\” – Steve Jobs",
    "\"Life is a sculpture that you cast as you make mistakes and learn from them\". — RM",
    "\“The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.\” – Winston Churchill",

];

function newQuote() {
let randNum= Math.floor(Math.random() * (quotes.length));
document.getElementById('quoteDisplay').innerHTML=quotes[randNum];
document.getElementById('quoteDisplayMobile').innerHTML = quotes[randNum]
}

document.getElementById('quote').addEventListener('click', newQuote)
document.getElementById('quoteMobile').addEventListener('click', newQuote)

//affirmations 

let affirmations = [
  "I create a safe and secure space for myself wherever I am.",
  "I give myself permission to do what is right for me.",
  "I am confident in my ability to [...].",
  "I use my time and talents to help others [...].",
  "What I love about myself is my ability to [...].",
  "I feel proud of myself when I [...].",
  "I give myself space to grow and learn.",
  "I allow myself to be who I am without judgment.",
  "I listen to my intuition and trust my inner guide.",
  "I accept my emotions and let them serve their purpose.",
  ];
  
function newAffirmation(){
   let randNum = Math.floor(Math.random() * (affirmations.length));
   document.getElementById('affirmationDisplay').innerHTML = affirmations[randNum];
   document.getElementById('affirmationDisplayMobile').innerHTML = affirmations[randNum]
}
  
document.getElementById('affirmation').addEventListener('click', newAffirmation)
document.getElementById('affirmationMobile').addEventListener('click', newAffirmation)
//End daily generators 

//Theme Switch start
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }    
    }
    
    toggleSwitch.addEventListener('change', switchTheme, false);

    function switchTheme(e) {
        if (e.target.checked) {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark'); //add this
        }
        else {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light'); //add this
        }    
    }

  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        }
    }
  
//End Theme switch

//Start todo functionality 

let todoItems = []

function getTodo(todo){
    const list = document.querySelector('.todo-list')
    const item = document.querySelector(`[data-key='${todo.id}']`)
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems))

   
    if(todo.deleted){
        item.remove();
        return
    }

    const isChecked = todo.checked ? 'done' : ''
    //create li
    const node = document.createElement('li')
    node.setAttribute('class', `todo-item ${isChecked}`)
    node.setAttribute('data-key', todo.id)
    //structure it
    node.innerHTML = `<input id="${todo.id}" type="checkbox/>
    <label for = "${todo.id}" class="tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `

    if(item){
        list.replaceChild(node, item)
    } else {
        list.append(node)
    }
}

function addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now()
    }

    todoItems.push(todo)
    getTodo(todo)
}

function toggleDone(key){
    //find it and check if it meets the condition of it being checked
    const index = todoItems.findIndex(item => item.id === Number(key))
    todoItems[index].checked = !todoItems[index].checked
    getTodo(todoItems[index])
}

function deleteTodo(key){
    //same as toggleDone but deleting it
    const index = todoItems.findIndex(item => item.id === Number(key))

    const todo = {
        deleted: true,
        ...todoItems[index]
    }
    //remove it
    todoItems = todoItems.filter(item => item.id !== Number(key))
    getTodo(todo)
}

const form = document.querySelector('.form')
form.addEventListener('submit', e => {
    e.preventDefault()
    const input = document.querySelector('.todo-input')

    const text = input.value.trim()
    if( text !== ''){
        addTodo(text)
        input.value = ''
        input.focus()
    }
})

const list = document.querySelector('.todo-list')
list.addEventListener('click', e =>{
    if(e.target.classList.contains('tick')){
        const itemKey = e.target.parentElement.dataset.key
        toggleDone(itemKey)
    }
    if(e.target.classList.contains('delete-todo')){
        const itemKey = e.target.parentElement.dataset.key 
        deleteTodo(itemKey)
    }
})

//render data from local storage

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef')
    if(ref){
        todoItems = JSON.parse(ref)
        todoItems.forEach(t => {
            getTodo(t)
        })
    }
})


//time over todolist
function startTime(){
    let today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm ="";
    m= checkTime(m);

    if (h > 12){
        h = h - 12;
        ampm = "PM";
    } else if (h == 12){
        h= 12;
        ampm= "AM";
    } else if (h < 12){
        ampm = "AM";
    } else {
        ampm="PM";
    };

    if(h==0) {
        h=12;
    }
    
    document.getElementById('display').innerHTML=h+":"+m+ampm;
    let t = setTimeout(function()
    {startTime()},500); }

    function checkTime(i){
        if (i<10){ i ="0" + i}; //add zero in front of numbers <10
        return i;
    }
    
    //date
    function startDate() {
        let d= new Date();
        let days=
        ["Sunday", "Monday", "Tuesday", "Wednestay", "Thursday", "Friday", "Saturday"];
        document.getElementById("date").innerHTML = days[d.getDay()]+" | " + [d.getMonth()+1]+ "/"+d.getDate()+"/"+d.getFullYear();

    }
