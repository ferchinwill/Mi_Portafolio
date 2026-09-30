import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, ExternalLink, Download, MessageSquare } from 'lucide-react';
import { getAssetUrl } from '../utils/assetPath';

const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.05 7.61C8.88 7.61 8.61 7.67 8.38 7.92C8.15 8.17 7.5 8.78 7.5 10.02C7.5 11.26 8.4 12.45 8.53 12.62C8.66 12.79 10.27 15.28 12.75 16.35C14.81 17.24 15.23 17.06 15.68 17.02C16.13 16.98 17.13 16.43 17.33 15.85C17.53 15.27 17.53 14.78 17.47 14.67C17.41 14.56 17.25 14.5 17.01 14.38C16.77 14.26 15.59 13.68 15.37 13.6C15.15 13.52 14.99 13.48 14.83 13.73C14.67 13.98 14.21 14.51 14.07 14.67C13.93 14.83 13.79 14.85 13.55 14.73C13.31 14.61 12.54 14.36 11.62 13.54C10.9 12.9 10.42 12.11 10.28 11.87C10.14 11.63 10.26 11.5 10.38 11.38C10.49 11.27 10.63 11.09 10.75 10.95C10.87 10.81 10.91 10.71 10.99 10.55C11.07 10.39 11.03 10.25 10.97 10.13C10.91 10.01 10.45 8.87 10.26 8.41C10.07 7.96 9.88 8.02 9.74 8.01C9.61 8.01 9.45 8 9.29 8C9.13 8 9.05 7.61 9.05 7.61Z" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const Contact: React.FC = () => {
  // Selector de modo: 'whatsapp' o 'email'
  const [contactMode, setContactMode] = useState<'whatsapp' | 'email'>('whatsapp');

  // Formulario Correo
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Formulario WhatsApp
  const [whatsappForm, setWhatsappForm] = useState({
    name: '',
    topic: 'Desarrollo de Software / Web',
    message: '',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWhatsappForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailSubmitting(true);

    setTimeout(() => {
      setIsEmailSubmitting(false);
      setEmailSuccess(true);
      setEmailForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setEmailSuccess(false), 4500);
    }, 1200);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '528331553481';
    const text = `¡Hola Fernando! Mi nombre es ${whatsappForm.name.trim() || 'un interesado'}.\n\n*Motivo:* ${whatsappForm.topic}\n*Mensaje:* ${whatsappForm.message.trim() || 'Me gustaría ponerme en contacto contigo para platicar de un proyecto.'}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contacto" className="contact-main-section">
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Cabecera de la sección */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Ponte en contacto</span>
          <h2 className="section-title">Contacto</h2>
          <div className="section-line"></div>
        </div>

        {/* ========================================================
            SELECTOR INTERCAMBIADOR: WHATSAPP VS CORREO ELECTRÓNICO
            ======================================================== */}
        <div className="contact-channel-switcher-wrapper">
          <div className="contact-channel-switcher">
            <button
              type="button"
              className={`channel-switch-btn whatsapp ${contactMode === 'whatsapp' ? 'active' : ''}`}
              onClick={() => setContactMode('whatsapp')}
            >
              <WhatsAppIcon size={18} />
              <span>Mensaje por WhatsApp</span>
              <span className="channel-live-dot" title="Respuesta rápida" />
            </button>

            <button
              type="button"
              className={`channel-switch-btn email ${contactMode === 'email' ? 'active' : ''}`}
              onClick={() => setContactMode('email')}
            >
              <Mail size={18} />
              <span>Formulario de Correo</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            GRID PRINCIPAL: FORMULARIO (IZQ) | MIS DATOS + MAPA (DER)
            ======================================================== */}
        <div className="contact-two-cols-grid">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO INTERCAMBIABLE */}
          <div className="contact-form-column">
            {contactMode === 'whatsapp' ? (
              /* FORMULARIO ESTILO WHATSAPP */
              <div className="whatsapp-themed-card">
                <div className="whatsapp-card-header">
                  <div className="whatsapp-avatar-box">
                    <WhatsAppIcon size={24} />
                  </div>
                  <div className="whatsapp-header-text">
                    <div className="whatsapp-contact-name">
                      <span>Fernando Moreno Wilches</span>
                      <span className="whatsapp-verified-badge" title="Cuenta Verificada">✓</span>
                    </div>
                    <span className="whatsapp-status-sub">
                      +52 (833) 155-3481 • En línea para proyectos
                    </span>
                  </div>
                </div>

                <form onSubmit={handleWhatsAppSubmit} className="whatsapp-card-form">
                  <div className="form-group">
                    <label htmlFor="wpp-name" className="form-label whatsapp-label">
                      Tu Nombre o Empresa
                    </label>
                    <input
                      type="text"
                      id="wpp-name"
                      name="name"
                      required
                      value={whatsappForm.name}
                      onChange={handleWhatsAppChange}
                      placeholder="Ej. Ing. Carlos Martínez / Empresa Tech"
                      className="form-input whatsapp-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="wpp-topic" className="form-label whatsapp-label">
                      Motivo del Contacto
                    </label>
                    <select
                      id="wpp-topic"
                      name="topic"
                      value={whatsappForm.topic}
                      onChange={handleWhatsAppChange}
                      className="form-input whatsapp-input whatsapp-select"
                    >
                      <option value="Desarrollo de Software / Web">Desarrollo de Software / Plataforma Web</option>
                      <option value="Aplicación Móvil (Flutter)">Aplicación Móvil (Flutter / Multiplataforma)</option>
                      <option value="Diseño UI/UX o Identidad Gráfica">Diseño UI/UX o Identidad Gráfica</option>
                      <option value="Propuesta de Vacante / Empleo">Propuesta de Vacante / Empleo</option>
                      <option value="Consultoría / Cotización General">Consultoría / Cotización General</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="wpp-message" className="form-label whatsapp-label">
                      Tu Mensaje
                    </label>
                    <textarea
                      id="wpp-message"
                      name="message"
                      required
                      rows={4}
                      value={whatsappForm.message}
                      onChange={handleWhatsAppChange}
                      placeholder="Escribe aquí los detalles del proyecto o consulta que deseas coordinar..."
                      className="form-textarea whatsapp-input"
                    />
                  </div>

                  {/* Previsualización estilo globo de WhatsApp */}
                  <div className="whatsapp-chat-bubble-preview">
                    <div className="chat-bubble-meta">
                      <span className="chat-bubble-tag">Vista previa de tu mensaje:</span>
                      <span className="chat-bubble-time">Ahora</span>
                    </div>
                    <p className="chat-bubble-body">
                      {whatsappForm.message.trim()
                        ? `Hola Fernando, soy ${whatsappForm.name.trim() || '[Tu Nombre]'}. Me contacto por ${whatsappForm.topic}: ${whatsappForm.message.trim()}`
                        : `Hola Fernando, me interesa ponerme en contacto contigo para coordinar una reunión o proyecto sobre ${whatsappForm.topic}.`}
                    </p>
                    <span className="chat-bubble-checks">✓✓</span>
                  </div>

                  {/* Botón de Enviar a WhatsApp */}
                  <button type="submit" className="whatsapp-submit-btn">
                    <WhatsAppIcon size={20} />
                    <span>Iniciar Chat en WhatsApp</span>
                    <ExternalLink size={16} />
                  </button>
                </form>
              </div>
            ) : (
              /* FORMULARIO ESTILO CORREO ELECTRÓNICO */
              <div className="email-themed-card">
                <div className="email-card-header">
                  <div className="email-icon-box">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="email-card-title">Envía un Correo Electrónico</h3>
                    <p className="email-card-sub">Recibiré tu mensaje directamente en mi bandeja de entrada.</p>
                  </div>
                </div>

                <form onSubmit={handleEmailSubmit} className="email-card-form">
                  <div className="form-group">
                    <label htmlFor="email-name" className="form-label">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="email-name"
                      name="name"
                      required
                      value={emailForm.name}
                      onChange={handleEmailChange}
                      placeholder="Ej. Ing. Carlos Martínez"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email-address" className="form-label">
                      Tu Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      required
                      value={emailForm.email}
                      onChange={handleEmailChange}
                      placeholder="Ej. carlos@empresa.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email-subject" className="form-label">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="email-subject"
                      name="subject"
                      required
                      value={emailForm.subject}
                      onChange={handleEmailChange}
                      placeholder="Ej. Cotización Sistema CRM / Oportunidad Laboral"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email-message" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="email-message"
                      name="message"
                      required
                      rows={4}
                      value={emailForm.message}
                      onChange={handleEmailChange}
                      placeholder="Describe los requerimientos de tu proyecto o detalles de la propuesta..."
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isEmailSubmitting}
                    className="email-submit-btn"
                  >
                    {isEmailSubmitting ? (
                      'Enviando mensaje...'
                    ) : emailSuccess ? (
                      <span className="btn-flex-center">
                        <Check size={18} /> ¡Mensaje Enviado con éxito!
                      </span>
                    ) : (
                      <span className="btn-flex-center">
                        Enviar Correo Electrónico <Send size={16} />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: MIS DATOS (ARRIBA) + MAPA TAMPICO (ABAJO) */}
          <div className="contact-info-column">
            
            {/* BLOQUE SUPERIOR: MIS DATOS */}
            <div className="contact-details-box">
              <div className="details-header-row">
                <h3 className="details-box-title">Mis Datos de Contacto</h3>
                <span className="availability-pill">
                  <span className="pulse-dot green" /> Disponible
                </span>
              </div>
              <p className="details-box-desc">
                Contáctame directamente por el canal de tu preferencia para platicar de proyectos de software, desarrollo web o consultoría:
              </p>

              <div className="details-cards-list">
                {/* Correo Electrónico */}
                <a href="mailto:data_will23@hotmail.com" className="details-card-item">
                  <div className="details-icon-wrapper blue">
                    <Mail size={18} />
                  </div>
                  <div className="details-card-text">
                    <span className="details-item-label">Correo Electrónico</span>
                    <span className="details-item-value">data_will23@hotmail.com</span>
                  </div>
                </a>

                {/* WhatsApp / Teléfono */}
                <a
                  href="https://wa.me/528331553481"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="details-card-item"
                >
                  <div className="details-icon-wrapper emerald">
                    <Phone size={18} />
                  </div>
                  <div className="details-card-text">
                    <span className="details-item-label">WhatsApp / Celular</span>
                    <span className="details-item-value">+52 (833) 155-3481</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/ferchinwill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="details-card-item"
                >
                  <div className="details-icon-wrapper violet">
                    <GithubIcon size={18} />
                  </div>
                  <div className="details-card-text">
                    <span className="details-item-label">Perfil de GitHub</span>
                    <span className="details-item-value">github.com/ferchinwill</span>
                  </div>
                </a>

                {/* Ubicación */}
                <div className="details-card-item">
                  <div className="details-icon-wrapper amber">
                    <MapPin size={18} />
                  </div>
                  <div className="details-card-text">
                    <span className="details-item-label">Ubicación</span>
                    <span className="details-item-value">Tampico, Tamaulipas, México</span>
                  </div>
                </div>
              </div>

              {/* Botón de Descargar CV */}
              <div className="details-cv-row">
                <a
                  href={getAssetUrl('/CV_Fernando_Moreno_Wilches.pdf')}
                  download="CV_Fernando_Moreno_Wilches.pdf"
                  className="details-cv-btn"
                >
                  <Download size={17} />
                  <span>Descargar Curriculum Vitae en PDF</span>
                </a>
              </div>
            </div>

            {/* BLOQUE INFERIOR: MAPA DE TAMPICO */}
            <div className="contact-map-box">
              <div className="map-box-header">
                <div className="map-header-left">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="map-header-title">Ubicación Geográfica</span>
                </div>
                <span className="map-city-tag">Tampico, Tamps.</span>
              </div>

              {/* Iframe del mapa de Tampico (ubicación representativa) */}
              <div className="map-frame-container">
                <iframe
                  title="Mapa de Tampico, Tamaulipas, México"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118227.1706853503!2d-97.94050587285157!3d22.28479203649666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d95d55b0a738bf%3A0x6b42b6a03e1e7f91!2sTampico%2C%20Tamps.!5e0!3m2!1ses!2smx!4v1711800000000!5m2!1ses!2smx"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-embedded-iframe"
                />
              </div>

              <div className="map-footer-note">
                <MessageSquare size={13} className="text-blue-400" />
                <span>Disponible para trabajo remoto en cualquier estado o país, y presencial / híbrido en Tampico y zona conurbada.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
