import { LitElement, html, css } from 'lit';

export class LectureButtons extends LitElement {
  static get properties() {
    return {
      activeSlide: { type: Number },
      totalSlides: { type: Number },
    };
  }

  static get styles() {
    return css`
      .button {
        margin: 5px;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        font-size: 14px;
        background-color: #3498db;
        color: #fff;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }

      .button:hover {
        background-color: #2980b9;
      }
    `;
  }

  previousSlide() {
    if (this.activeSlide > 0) {
      this.activeSlide--;
      this.dispatchEvent(new CustomEvent('previous-slide', { detail: this.activeSlide }));
    }
  }

  nextSlide() {
    console.log(this.activeSlide, this.totalSlides);
    if (this.activeSlide < (this.totalSlides - 1)) {
      this.activeSlide++;
      console.log(this.activeSlide)
      this.dispatchEvent(new CustomEvent('next-slide', { detail: this.activeSlide }));
    }
  }

  render() {
    return html`
      <div class="button" @click="${this.previousSlide}">Previous</div>
      <div class="button" @click="${this.nextSlide}">Next</div>
    `;
  }
}

customElements.define('lecture-buttons', LectureButtons);