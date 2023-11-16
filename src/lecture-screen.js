import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/video-player/video-player.js';

export class LectureScreen extends LitElement {
  static get properties() {
    return {
      videoUrl: { type: String },
      activeSlide: { type: Object }, 
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    `;
  }

  setActiveSlide(lectureSlide) {
    this.activeSlide = lectureSlide;
    this.updateVideoTime();
  }

  getSlideIndex(lectureSlide) {
    return this.lectureSlides.findIndex(slide => slide.startTime === lectureSlide.startTime);
  }

  updateVideoTime() {
    if (this.activeSlide) {
      const videoPlayer = this.shadowRoot.querySelector('video-player');

      if (videoPlayer) {
        videoPlayer.source = this.activeSlide.videoUrl;
        // videoPlayer.activeTime = this.activeSlide.startTime;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.lectureSlides) {
      fetch('./assets/channels.json')
        .then(response => response.json())
        .then(data => {
          this.lectureSlides = data[0].timeslots;
          this.videoUrl = data[0].videoUrl;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }

  render() {
    return html`
      <video-player source=${this.videoUrl} accent-color="orange" dark track="https://haxtheweb.org/files/HAXshort.vtt">
      </video-player>
    `;
  }
}

customElements.define('lecture-screen', LectureScreen);