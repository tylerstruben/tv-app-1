import { LitElement, html, css } from 'lit';

export class LectureDescription extends LitElement {
  static get properties() {
    return {
      activeSlide: { type: Number },
      lectureSlides: { type: Array },
    };
  }

  static get styles() {
    return css`
      .description {
        margin: 10px;
        padding: 15px;
        border: 1px solid black;
        cursor: pointer;
        font-size: 16px;
        background-color: #ecf0f1;
        border-radius: 5px;
      }
    `;
  }

  render() {
    const slide = this.lectureSlides[this.activeSlide];
    return html`
      <div class="description">
        ${slide ? slide.description : 'Select a slide to view information.'}
      </div>
    `;
  }
}

customElements.define('lecture-description', LectureDescription);