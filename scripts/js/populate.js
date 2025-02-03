// Fetch data from the JSON file
fetch('config/data.json')
  .then(response => response.json())
  .then(data => {
    // Update metadata
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaViewport = document.querySelector('meta[name="viewport"]');

    if (metaDescription) {
      metaDescription.setAttribute('content', data.meta.description);
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', data.meta.keywords);
    }
    if (metaViewport) {
      metaViewport.setAttribute('content', data.meta.viewport);
    }

    // Update the title
    document.title = data.title;


    // Populate the header
    document.getElementById('json-header-logo').textContent = data.header.logo;
    const navLinks = data.header.nav_links.map(
      link => `<li class="nav-item"><a class="nav-link" href="#${link.id}">${link.label}</a></li>`
    ).join('');
    document.getElementById('json-header-navlinks').innerHTML = navLinks;

    // Populate the hero section
    document.getElementById('json-hero-heading').textContent = data.hero.heading;
    document.getElementById('json-hero-titel').textContent = data.hero.titel;
    document.getElementById('json-hero-image').innerHTML = `<img src="${data.hero.image}" alt="Hero Image">`;

    // Populate the about section
    document.getElementById('json-about-biography').textContent = data.about.biography;
    const skills = data.about.skills.map(skill => `<li><code>${skill}</code></li>`).join('');
    document.getElementById('json-about-skills').innerHTML = skills;
    const connectLinks = data.about.connect_links.map(
      link => `<li><a class="button-circle button-circle-sm" href="${link.platform}"><i class="bi ${link.icon}"></i><i class="bi ${link.icon}"></i></a></li>`
    ).join('');
    document.getElementById('json-about-connect_links').innerHTML = connectLinks;
    document.getElementById('json-about-projects_done').textContent = data.about.projects_done;
    document.getElementById('json-about-years_experience').textContent = data.about.years_experience;
    document.getElementById('json-about-worldwide_clients').textContent = data.about.worldwide_clients;

    // Populate the services section
    const services = data.services.map(service => `
      <div class="col-12">
        <div class="service-box">
          <div class="service-order">
            <h3>${service.order}/</h3>
          </div>
          <div class="service-title">
            <h3>${service.title}</h3>
          </div>
          <div class="service-text">
            <p>${service.description}</p>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById('json-services').innerHTML = services;

    // Populate the languages section
    const languages = data.languages.map(
      language => `<div class="swiper-slide"><div class="client-box"><a href="#portfolio"><img src="${language}" alt="Language"></a></div></div>`
    ).join('');
    document.getElementById('json-languages').innerHTML = languages;

    // Populate the portfolio section
    document.getElementById('json-portfolio-description').textContent = data.portfolio.description;
    const portfolioItems = data.portfolio.content.map(item => `
      <div class="swiper-slide">
        <div class="portfolio-box">
          <div class="portfolio-img">
            <a href="${item.href}">
              <img src="${item.image}" alt="${item.title}">
            </a>
          </div>
          <div class="pt-4">
            <ul class="list-inline-dot sm-heading text-white mb-2">
              ${item.categories.map(category => `<li><a href="#">${category}</a></li>`).join('')}
            </ul>
            <h2>${item.title}</h2>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById('json-portfolio-content').innerHTML = portfolioItems;

    // Populate the testimonials section
    const testimonials = data.testimonials.map(testimonial => `
      <div class="swiper-slide">
        <div class="testimonial-box">
          <div class="testimonial-avatar">
            <img src="${testimonial.image}" alt="Testimonial Avatar">
          </div>
          <div class="testimonial-content">
            <h3>${testimonial.name}</h3>
            <span>${testimonial.role}</span>
            <p>${testimonial.quote}</p>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById('json-testimonials').innerHTML = testimonials;

    // Populate the contact section
    document.getElementById('json-contact-email').textContent = data.contact.email;
    document.getElementById('json-contact-phone').textContent = data.contact.phone;

    // Populate the footer
    document.getElementById('json-footer-text').textContent = data.footer.text;
  })
  .catch(error => console.error('Error loading JSON data:', error));
