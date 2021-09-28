class DefaultHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header id="header">
      <nav class="nav-bar">
        <h1 id="title">SIRIUZZZ PAGE</h1>
        <ul class="nav-links">
          <li class="routes" id="home"><a href="/">Home</a></li>
          <li class="routes" id="users"><a href="/users">Users</a></li>
          <li class="routes" id="about"><a href="/about">About</a></li>
          <li class="routes" id="contact"><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    `;
  }
}
customElements.define("default-header", DefaultHeader);



class DefaultFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
      <div id="credits">©2021 siriuzzz</div>
    </footer>`;
  }
}

customElements.define("default-footer", DefaultFooter);

function change(req, res, next) {

  const returnLink = document.createElement('a');
  returnLink.id = 'return-link'
  returnLink.innerHTML = "<- Volver a la pagina anterior";

  // contact
  if (window.location.pathname === '/contact') {
    const contactFormTitle = document.getElementById('contact-form-title');
    const contactForm = document.getElementById('contact-form');

    contactFormTitle.innerHTML = 'MENSAJE ENVIADO';
    contactForm.remove();

    returnLink.href = '/contact'
    contactFormTitle.after(returnLink);

  } else if (window.location.pathname === '/users') { //users
    const usersFormTitle = document.getElementById('users-form-title');
    const usersForm = document.getElementById('users-form');
    const nombre = { nombre };


    usersFormTitle.innerHTML = 'CREADO USUARIO: ' + nombre;
    usersForm.remove();

    returnLink.href = '/users'
    usersFormTitle.after(returnLink);
  }

  next();
}

(function dynamicTitle() {
  let title = document.getElementById('title');
  switch (window.location.pathname) {
    case '/about':
      title.innerHTML = `${title.innerText} | ABOUT`;
      break;

    case '/contact':
      title.innerHTML = `${title.innerText} | CONTACT`;
      break;

    case '/users':
      title.innerHTML = `${title.innerText} | USERS`;
      break;

    default:
      title.innerHTML = `${title.innerText} | HOME`;

  }
})();

console.log()