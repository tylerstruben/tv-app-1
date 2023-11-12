import { LitElement, html, css } from 'lit';

export class LectureSlideList extends LitElement {
  static get properties() {
    return {
      lectureSlides: { type: Array },
      activeSlide: { type: Number },
    };
  }

  static get styles() {
    return css`
      .lectureslide-list {
        overflow-y: auto;
        max-height: 50vh; 
      }

      .lectureslide {
        width: 100%;
        height: 50px; 
        margin: 5px; 
        padding: 5px; 
        border: 1px solid black;
        cursor: pointer;
        position: relative;
        transition: background-color 0.3s ease;
      }

      .lectureslide.active {
        background-color: lightgray;
      }

      .lectureslide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .lectureslide:hover {
        background-color: #ecf0f1;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('./assets/channels.json')
      .then(response => response.json())
      .then(data => {
        this.lectureSlides = data[0].timeslots;
      });
  }

  render() {
    return html`
      <div class="lectureslide-list">
        ${this.lectureSlides.map((lectureSlide, index) =>
          html`
            <div class="lectureslide ${index === this.activeSlide ? 'active' : ''}" @click="${() => this.selectLectureSlide(index)}">
              <img src="${lectureSlide.thumbnailUrl}" alt="${lectureSlide.title}">
              <div>${lectureSlide.title}</div>
            </div>
          `
        )}
      </div>
    `;
  }

  selectLectureSlide(index) {
    this.activeSlide = index;
    const lectureSlide = this.lectureSlides[index];
    const videoPlayer = document.querySelector('video');

    videoPlayer.src = lectureSlide.videoUrl;
    videoPlayer.currentTime = lectureSlide.startTime;

    this.dispatchEvent(new CustomEvent('lecture-slide-selected', { detail: lectureSlide }));
  }
}

customElements.define('lecture-slide-list', LectureSlideList);