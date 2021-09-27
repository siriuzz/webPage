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