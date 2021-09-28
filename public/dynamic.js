// function change(message) {
//     const formTitle = document.getElementById('contact-form-title');
//     const form = document.getElementById('contact-form');

//     formTitle.innerHTML = message;
//     form.remove();

//     const returnLink = document.createElement('a');
//     returnLink.href = '/contact'
//     returnLink.id = 'return-link'
//     returnLink.innerHTML = "<- Volver a la pagina anterior";
    

//     formTitle.after(returnLink);
// }

// (function dynamicTitle(){
//     let title = document.getElementById('title');
//     console.log('done')
//     if (window.location.pathname === '/about'){
//         title.innerHTML = `${title.innerText} | ABOUT`;
//     } else if (window.location.pathname === '/contact'){
//         title.innerHTML =  `${title.innerText} | CONTACT`;
//     }
// })();