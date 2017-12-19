//urls
const searchUrl = 'https://api.spotify.com/v1/search';
const cliendId = '1ff0adac01ee4b558a9872e425f30394';
const authorizationUrl = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://ray_jammming.surge.sh'; //this URI must be added to spotify app whitelisted Redirect URIs
//const redirectUri = 'http://localhost:3000';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenArr = window.location.href.match(/access_token=([^&]*)/);
    const expiresInArr = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenArr && expiresInArr) {
      accessToken = accessTokenArr[1];
      window.setTimeout(() => accessToken = '', expiresInArr[1] * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const url = `${authorizationUrl}?client_id=${cliendId}&redirect_uri=${redirectUri}&response_type=token&scope=playlist-modify-public&state=123`;
      window.location = url;
      return accessToken;
    }
  },

  //whatwg-fetch polyfill was added to ensure compatibility
  async search(term) {
    const urlToFetch = `${searchUrl}?q=${term}&type=track`;
    try {
      let response = await fetch(urlToFetch, {
        headers: {
          "Authorization": `Bearer ${this.getAccessToken()}`
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse.tracks.items.map(track => {
          return {
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            id: track.id,
            name: track.name
          }
        });
      }
      throw new Error('request failed');
    } catch (error) {
      console.log(error);
    }
  },

  savePlaylist(name, trackUris) {
    //check if there are values saved to the method's two arguments
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }

};

export default Spotify;