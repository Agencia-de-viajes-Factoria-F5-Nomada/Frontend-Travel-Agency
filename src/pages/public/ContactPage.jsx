function ContactPage() {
  return (
    <section className="contact-page">
      <div className="contact-page__container">
        <div className="contact-page__intro">
          <span className="contact-page__eyebrow">Atencion personalizada</span>
          <h1>Contacto</h1>
          <p>
            Nuestro equipo puede ayudarte a resolver dudas sobre destinos,
            reservas y disponibilidad.
          </p>
        </div>
        <form className="contact-page__form">
          <label>
            Nombre
            <input type="text" placeholder="Tu nombre" />
          </label>
          <label>
            Email
            <input type="email" placeholder="tu@email.com" />
          </label>
          <label>
            Mensaje
            <textarea rows="5" placeholder="Cuentalo aqui" />
          </label>
          <button type="button">Enviar consulta</button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
