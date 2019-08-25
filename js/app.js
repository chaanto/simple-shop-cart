//variabel
let courses = document.querySelector('#courses-list'),
    shopCartContent = document.querySelector('#cart-content tbody'),
    clearCartContent = document.querySelector('#clear-cart');



// listeners

loadEventListener();

function loadEventListener() {
     // button add cart clicked
     courses.addEventListener('click', buyCourse);

     //  button remove cart clicked 
     shopCartContent.addEventListener('click', courseRemoval);

     // button clear cart clicked
     clearCartContent.addEventListener('click', clearCart);
    
     // get local record
     document.addEventListener('DOMContentLoaded', getLocalStorage)
}

// function 

function buyCourse(e) {
    e.preventDefault();
    // use delegation to find the course was added

    if(e.target.classList.contains('add-to-cart')) {
        let course = e.target.parentElement.parentElement

        getCourseInfo(course)
    }
}

function getCourseInfo(course) {
    let courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
           
    }
    // insert to cart
    addIntoCart(courseInfo);
}

function addIntoCart(course) {
    // add html element <tr>
    let row = document.createElement('tr');
    
    // insert to html

    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width="100px"/>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // add 2 cart
    shopCartContent.appendChild(row); 

    // save to local storage
    saveCartTemporary(course);
}

function saveCartTemporary(course) {

    let courses = getCartLocalStorage();

    // insert course into array

    courses.push(course);

    // local storage only save string so need parse json to string
    
    localStorage.setItem('courses', JSON.stringify(courses) );

}

function getCartLocalStorage() {

    let courses;
    // cjeck if no value then blank array if have value get from local
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
         courses = JSON.parse(localStorage.getItem('courses'));
    }
    
    return courses;    
}


//remove course
function courseRemoval(e) {

    let course, courseId;

    // remove from dom
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    courseLocalStorageRemoval(courseId);
    // remove from local storage

}
// remove recrod from ls
function courseLocalStorageRemoval(id) {
    // get local storage
    let getCourses = getLocalStorage();

    // loop array to find index
    getCourses.forEach(function(getCourse, index) {
        if(getCourse.id === id) {
            getCourses.splice(index, 1);
        }
    });
    // add rest of array
    localStorage.setItem('courses', JSON.stringify(getCourses));

}

//clear cart

function clearCart() {
    // shopCartContent.innerHTML = '';

    while(shopCartContent.firstChild) {
        shopCartContent.removeChild(shopCartContent.firstChild);
    }

    clearLocalStorage();
}

function clearLocalStorage(){
    localStorage.clear();
}

// get value from local storage into shop cart

function getLocalStorage() {
    let getCourses = getCartLocalStorage();

    // loop course and print to cart
    getCourses.forEach(function(course) {
        // add hmtl element based on value local storage
        let row = document.createElement('tr');

        // pass to cart
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width="100px"/>
                </td>
                <td>
                    ${course.title}
                </td>
                <td>
                    ${course.price}
                </td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shopCartContent.appendChild(row);
        
    });
}
  
