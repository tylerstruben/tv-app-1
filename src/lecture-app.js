import { LitElement, html, css } from 'lit';
import './lecture-slide-list.js';
import './lecture-screen.js';
import './lecture-buttons.js';
import './lecture-description.js';


class LectureApp extends LitElement {
  static get properties() {
    return {
      lectureSlides: { type: Array },
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.activeSlideIndex = 0;
    this.lectureSlides = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupListeners();
    this.loadLectureSlides();
  }

  loadLectureSlides() {
    // Fetch and load lecture slides
    fetch('./assets/channels.json')
      .then(response => response.json())
      .then(data => {
        this.lectureSlides = data[0].timeslots;
      })
      .catch(error => {
        console.error('Error fetching lecture slides:', error);
      });
  }

  setupListeners() {
    // Listen for custom events from child components
    this.addEventListener('lecture-slide-selected', this.handleLectureSlideSelected.bind(this));
    this.addEventListener('previous-slide', this.handlePreviousSlide.bind(this));
    this.addEventListener('next-slide', this.handleNextSlide.bind(this));
  }

  handleLectureSlideSelected(event) {
    this.activeSlideIndex = event.detail.startTime;
    this.updateActiveSlide();
  }

  handlePreviousSlide(event) {
    this.activeSlideIndex = event.detail;
    this.updateActiveSlide();
  }

  handleNextSlide(event) {
    this.activeSlideIndex = event.detail;
    this.updateActiveSlide();
  }

  updateActiveSlide() {
    // Update the active slide for all child components
    const lectureSlideList = this.shadowRoot.querySelector('lecture-slide-list');
    const lectureScreen = this.shadowRoot.querySelector('lecture-screen');
    const lectureDescription = this.shadowRoot.querySelector('lecture-description');
    const lectureButtons = this.shadowRoot.querySelector('lecture-buttons');

    if (lectureSlideList) {
      lectureSlideList.activeSlide = this.activeSlideIndex;
      lectureSlideList.lectureSlides = this.lectureSlides;
    }

    if (lectureScreen) {
      lectureScreen.activeSlide = this.activeSlideIndex;
      lectureScreen.lectureSlides = this.lectureSlides;
    }

    if (lectureDescription) {
      lectureDescription.activeSlide = this.activeSlideIndex;
      lectureDescription.lectureSlides = this.lectureSlides;
    }

    if (lectureButtons) {
      lectureButtons.activeSlide = this.activeSlideIndex;
      lectureButtons.totalSlides = this.lectureSlides.length;
    }
  }

  render() {
    return html`
      <lecture-slide-list @lecture-slide-selected="${this.handleLectureSlideSelected}"></lecture-slide-list>
      <lecture-screen></lecture-screen>
      <lecture-buttons @previous-slide="${this.handlePreviousSlide}" @next-slide="${this.handleNextSlide}"></lecture-buttons>
      <lecture-description></lecture-description>
    `;
  }
}

customElements.define('lecture-app', LectureApp);