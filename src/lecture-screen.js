import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/video-player/video-player.js";
export class LectureScreen extends LitElement {
  static get properties() {
    return {
      videoUrl: { type: String },
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
        width: 80%; 
        height: 100%;
        object-fit: contain;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('./assets/channels.json')
      .then(response => response.json())
      .then(data => {
        this.videoUrl = data[0].videoUrl;
      });
  }

 
  render() {
    return html`
   <video-player source=${this.videoUrl} accent-color="orange" dark track="https://haxtheweb.org/files/HAXshort.vtt">
   </video-player>
   `;
    }
   
}

customElements.define('lecture-screen', LectureScreen);