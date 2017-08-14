GoogleMaps = {
  load(libraries = [], key = '') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}` +
      `&libraries=${libraries.join(',')}&callback=GoogleMaps.init`;
    document.body.appendChild(script);
  },
  init() {
    this.loaded = true;
  },
};