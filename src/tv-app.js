import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";
import "@lrnwebcomponents/video-player/video-player.js";

export class TvApp extends LitElement {
  static get tag() {
    return 'tv-app';
  }

  static get properties() {
    return {
      appName: { type: String },
      source: { type: String },
      channelList: { type: Array },
      activeChannel: { type: String },
    };
  }

  constructor() {
    super();
    this.appName = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.channelList = [];
  }

  static get styles() {
    return [
      css`
        :host {
          font-family: 'Arial', sans-serif;
          display: block;
          background-color: #f8f8f8;
          color: #333;
        }

        .app-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
          padding: 20px;
        }

        .video-section {
          grid-column: 1;
        }

        .channel-list {
          grid-column: 2;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .thumbnail {
          max-width: 100%;
          height: auto;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .prev-button,
        .next-button {
          font-size: 16px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .prev-button:hover,
        .next-button:hover {
          background-color: #0056b3;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="app-container">
        <div class="video-section">
          
          
      <video-player source="https://www.youtube.com/watch?v=Pu0JawDgkSw" accent-color="blue" dark track="https://haxtheweb.org/files/HAXshort.vtt"></video-player> 
      <h2>Top 10 best BMW M cars. EVER!</h2>
        
        </div>  
        <div class="channel-list">
          <h2>${this.appName}</h2>
          ${this.channelList.map(
            (item, index) => html`
              <tv-channel 
                title="${item.title}"
                presenter="${item.metadata.author}"
                @click="${this.itemClick}"
                timecode="${item.metadata.timecode}"
                thumbnail="${item.metadata.thumbnail}"
              ></tv-channel> 
            `
          )}
        </div>
      </div>
      <div class="controls">
        <button class="prev-button">Previous</button>
        <button class="next-button">Next</button>
      </div>
    `;
  }

  itemClick(e) {
    // Handle channel item click
    console.log(e.target);
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector("a11y-media-player").media.currentTime;
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').play();
    this.shadowRoot.querySelector('video-player').shadowRoot.querySelector('a11y-media-player').seek(e.target.timecode);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateChannelList(this[propName]);
      }
    });
  }

  async updateChannelList(source) {
    await fetch(source).then((resp) => resp.ok ? resp.json() : []).then((responseData) => {
      if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) {
        this.channelList = [...responseData.data.items];
      }
    });
  }
}

customElements.define(TvApp.tag, TvApp);